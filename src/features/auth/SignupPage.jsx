import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import {
  validateEmail,
  validatePassword,
  formatErrorMessage,
} from "../../utils/validation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

/**
 * Signup page component
 * Handles new user registration
 */
const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const { data, error } = await signUp(
        formData.email,
        formData.password,
        formData.fullName
      );

      if (error) {
        toast.error(formatErrorMessage(error), {
          duration: 4000,
          position: "top-center",
        });
        return;
      }

      if (data) {
        toast.success(
          "Account created successfully! Welcome to your LSAT journey! 🌱",
          {
            duration: 4000,
            position: "top-center",
          }
        );
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Start Your Journey 🌱
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and begin studying
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              placeholder="Geraudia"
              icon={FiUser}
              fullWidth
              error={errors.fullName?.message}
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="geraudia@example.com"
              icon={FiMail}
              fullWidth
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: validateEmail,
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              icon={FiLock}
              fullWidth
              error={errors.password?.message}
              helperText="Must be at least 8 characters with uppercase, lowercase, and numbers"
              {...register("password", {
                required: "Password is required",
                validate: validatePassword,
              })}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              icon={FiLock}
              fullWidth
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >
                I agree to the{" "}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.terms.message}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Create Account
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;
