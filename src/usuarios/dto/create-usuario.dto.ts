export class CreateUsuarioDto {
    User: string;
    Password: string;
    Mail: string;
    Rol: string;
    isFavorite: string[];
    imagePerfil: {
        public_id: string;
        imageUrl: string;
    };
}
