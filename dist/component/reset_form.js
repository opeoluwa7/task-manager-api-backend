"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const user_schema_1 = require("../schemas/user_schema");
const zod_1 = require("@hookform/resolvers/zod");
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importStar(require("axios"));
const ResetForm = () => {
    const { register, setError, handleSubmit, formState: { errors }, reset } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(user_schema_1.resetPasswordSchema)
    });
    const passwordReset = async (data) => {
        const response = await axios_1.default.post("https://task-manager-api-2025.up.railway.app/api/reset-password", data);
        return response;
    };
    const { mutate } = (0, react_query_1.useMutation)({
        mutationFn: passwordReset,
        onSuccess: () => {
            alert("Password reset successful!");
            reset();
        },
        onError: (error) => {
            if ((0, axios_1.isAxiosError)(error)) {
                const err = error.response?.data.error;
                setError("root", {
                    type: 'server',
                    message: err
                });
                const serverError = [];
                serverError.push(err);
                const value = Object.values(serverError[0]);
                const rootError = value[1]._errors[0];
                setError("root", {
                    type: 'server',
                    message: rootError
                });
            }
            else {
                setError("root", error);
            }
        }
    });
    const onSubmit = (data, e) => {
        e?.preventDefault();
        mutate(data);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { className: "", onSubmit: handleSubmit(onSubmit), children: [(0, jsx_runtime_1.jsx)("input", { ...register("password"), name: "password", type: "password", placeholder: "Enter your new password" }), errors.password && (0, jsx_runtime_1.jsx)("span", { className: "", children: errors.password.message }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { ...register("confirmPassword"), name: "confirmPassword", type: "password", placeholder: "Confirm your new password" }), errors.confirmPassword && (0, jsx_runtime_1.jsx)("span", { className: "", children: errors.confirmPassword.message }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { type: "submit" }), (0, jsx_runtime_1.jsx)("br", {}), errors.root && (0, jsx_runtime_1.jsx)("span", { className: "", children: errors.root.message })] }));
};
exports.default = ResetForm;
