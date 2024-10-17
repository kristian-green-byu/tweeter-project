import { ChangeEvent } from "react";
import { Buffer } from "buffer";
import { AuthPresenter, AuthView } from "./AuthPresenter";


export interface RegisterView extends AuthView {
    setImageBytes: (bytes: Uint8Array) => void;
}

export class RegisterPresenter extends AuthPresenter<RegisterView>{
    public imageUrl: string = "";
    public imageFileExtension: string = "";

    public constructor(view: RegisterView) {
        super(view);
    }

    protected getItemDescription(): string {
        return "register user"
    }

    public doRegister = async (firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array, imageFileExtension: string, rememberMe: boolean) => {
        super.doAuth(async () => {
            const [user, authToken] = await this.service.register(
                firstName,
                lastName,
                alias,
                password,
                imageBytes,
                imageFileExtension
            );
            this.view.updateUserInfo(user, user, authToken, rememberMe);
        });
    };

    public handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        this.handleImageFile(file);
    };

    public handleImageFile(file: File | undefined) {
        if (file) {
            this.imageUrl = URL.createObjectURL(file);

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const imageStringBase64 = event.target?.result as string;

                // Remove unnecessary file metadata from the start of the string.
                const imageStringBase64BufferContents =
                    imageStringBase64.split("base64,")[1];

                const bytes: Uint8Array = Buffer.from(
                    imageStringBase64BufferContents,
                    "base64"
                );

                this.view.setImageBytes(bytes);
            };
            reader.readAsDataURL(file);

            // Set image file extension (and move to a separate method)
            const fileExtension = this.getFileExtension(file);
            if (fileExtension) {
                this.imageFileExtension = fileExtension;
            }
        } else {
            this.imageUrl = "";
            this.view.setImageBytes(new Uint8Array());
        }
    };

    public getFileExtension(file: File): string | undefined {
        return file.name.split(".").pop();
    };
}