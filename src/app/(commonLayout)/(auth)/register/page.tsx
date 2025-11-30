import RegisterForm from "@/components/modules/Auth/register-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const RegisterPage = () => {
    return (
        <div className="flex min-h-[calc(100vh-340px)] w-full items-center justify-center p-6">
            <div className="w-full max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;