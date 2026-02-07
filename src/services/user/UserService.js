import ProtectedApiService from '../core/ProtectedApiService';
import ApiConfig from '../core/ApiConfig';

/**
 * Service for user-related operations
 * All user API calls go through this service
 */
class UserService extends ProtectedApiService {

    async getBalance() {
        return this.get(ApiConfig.ENDPOINTS.BALANCE);
    }

    async getAvatar() {
        return this.get(ApiConfig.ENDPOINTS.GET_AVATAR);
    }


    /**
     * Step 1: Request presigned URL from backend
     * Backend returns: { presigned_url: string, avatar_url: string }
     */
    async getPresignedUploadUrl(fileName) {
        return this.post(ApiConfig.ENDPOINTS.GET_AVATAR_UPLOAD_URL, {
            file_name: fileName,
        });
    }

    /**
     * Step 2: Upload file directly to MinIO using presigned URL
     */
    async uploadToMinIO(presignedUrl, imageBlob, fileType) {
        try {
            const response = await fetch(presignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': fileType,
                },
                body: imageBlob,
            });

            if (!response.ok) {
                throw new Error(`Ошибка загрузки в MinIO: ${response.status}`);
            }

            return true;
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('MinIO upload error:', error);
            }
            throw new Error('Ошибка при загрузке файла в хранилище');
        }
    }

    /**
     * Step 3: Confirm upload to backend
     * Backend returns: { avatar_url: string }
     */
    async confirmAvatarUpload(avatarUrl) {
        return this.post(ApiConfig.ENDPOINTS.AVATAR_COMPLETE, {
            file_name: avatarUrl,
        });
    }

    /**
     * Complete avatar upload flow
     */
    async uploadAvatar(imageBlob) {
        try {
            // Определяем расширение файла
            const fileType = imageBlob.type || 'image/jpeg';
            const ext = fileType.split('/')[1] || 'jpg';
            const fileName = `avatar_${Date.now()}.${ext}`;

            // Шаг 1: Получаем presigned URL от бэкенда
            const { presigned_url, avatar_url } = await this.getPresignedUploadUrl(fileName);

            if (!presigned_url || !avatar_url) {
                throw new Error('Не удалось получить ссылку для загрузки');
            }

            // Шаг 2: Загружаем файл напрямую в MinIO
            await this.uploadToMinIO(presigned_url, imageBlob, fileType);

            // Шаг 3: Подтверждаем загрузку на бэкенде
            const result = await this.confirmAvatarUpload(avatar_url);

            if (process.env.NODE_ENV === 'development') {
                console.log('confirmAvatarUpload result:', result);
            }

            // Backend возвращает { message, success }
            // Возвращаем результат для обновления аватара
            return { 
                success: result.success,
                message: result.message
            };
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Avatar upload flow error:', error);
            }
            
            // Пробрасываем ошибку дальше с сохранением её структуры
            throw error;
        }
    }


    async changePassword(oldPassword, newPassword) {
        return this.post(ApiConfig.ENDPOINTS.CHANGE_PASSWORD, {
            old_password: oldPassword,
            new_password: newPassword,
        });
    }
    
    // TODO: add more user-related methods here

}

const userService = new UserService();

export default userService;
