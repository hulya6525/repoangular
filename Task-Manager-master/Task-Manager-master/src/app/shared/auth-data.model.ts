// Kullanıcı kimlik doğrulama verilerini tanımlayan arayüz
export interface AuthData {
    email: string;     // Kullanıcının e-posta adresi (zorunlu)
    password: string;  // Kullanıcının şifresi (zorunlu)
    name?: string;     // Kullanıcının adı (isteğe bağlı)
}
