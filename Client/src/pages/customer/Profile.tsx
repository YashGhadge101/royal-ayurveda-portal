import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion, type Variants } from "framer-motion";
import { 
    User, Mail, Phone, Lock, 
    Eye, EyeOff, Loader2, Camera, ShieldCheck 
} from "lucide-react";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "../../services/customer.service";

// --- REUSABLE UI COMPONENTS ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ElementType;
    rightElement?: React.ReactNode;
}

const ProfileInput: React.FC<InputProps> = ({ icon: Icon, rightElement, disabled, ...props }) => (
    <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
            <Icon size={18} />
        </div>
        <input
            {...props}
            disabled={disabled}
            className={`w-full rounded-2xl border border-zinc-800 bg-black/50 py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none backdrop-blur-md transition-all duration-300 focus:border-indigo-500 focus:bg-zinc-900/50 focus:ring-1 focus:ring-indigo-500/50 ${
                disabled ? "cursor-not-allowed opacity-60" : ""
            }`}
        />
        {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                {rightElement}
            </div>
        )}
    </div>
);

const ActionButton: React.FC<{ loading: boolean; children: React.ReactNode }> = ({ loading, children }) => (
    <button
        type="submit"
        disabled={loading}
        className="relative flex w-full sm:w-auto min-w-[160px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
    >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
    </button>
);

// --- MAIN PROFILE COMPONENT ---
const Profile = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [profileData, setProfileData] = useState({ name: "", email: "", phone: "", avatarPreview: "" });
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile();
                setProfileData(prev => ({ ...prev, name: data.name || "", email: data.email || "", phone: data.phone || "" }));
            } catch (error) { toast.error("Failed to load profile."); }
            finally { setPageLoading(false); }
        };
        loadProfile();
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingProfile(true);
        try {
            const data = await updateProfile({ name: profileData.name, phone: profileData.phone });
            localStorage.setItem("customer", JSON.stringify(data.customer));
            toast.success("Profile Updated");
        } catch (error) { toast.error("Update Failed"); }
        finally { setSavingProfile(false); }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) return toast.error("Passwords do not match");
        setSavingPassword(true);
        try {
            await changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
            toast.success("Password Updated");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) { toast.error("Failed to change password"); }
        finally { setSavingPassword(false); }
    };

    const containerVariants: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

    if (pageLoading) return <div className="flex min-h-screen items-center justify-center bg-black"><Loader2 className="h-10 w-10 animate-spin text-indigo-500" /></div>;

    return (
        <div className="min-h-screen bg-black px-4 py-12 sm:px-6 lg:px-8">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="mx-auto max-w-4xl space-y-8">
                <motion.div variants={itemVariants}>
                    <h1 className="text-4xl font-bold text-white">Account Settings</h1>
                    <p className="mt-2 text-zinc-400">Manage your information and security.</p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <motion.div variants={itemVariants} className="lg:col-span-7">
                        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
                            <form onSubmit={handleProfileUpdate} className="space-y-5">
                                <ProfileInput icon={User} name="name" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} placeholder="Full Name" />
                                <ProfileInput icon={Mail} value={profileData.email} disabled placeholder="Email" />
                                <ProfileInput icon={Phone} name="phone" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} placeholder="Phone" />
                                <div className="pt-4 flex justify-end"><ActionButton loading={savingProfile}>Save Profile</ActionButton></div>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="lg:col-span-5">
                        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
                            <div className="mb-6 flex items-center gap-4 text-white">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><ShieldCheck size={24} /></div>
                                <div><h2 className="text-xl font-bold">Security</h2><p className="text-sm text-zinc-400">Update password</p></div>
                            </div>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <ProfileInput icon={Lock} type={showCurrentPassword ? "text" : "password"} name="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} placeholder="Current Password" rightElement={<button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>{showCurrentPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>} />
                                <ProfileInput icon={Lock} type={showNewPassword ? "text" : "password"} name="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} placeholder="New Password" />
                                <ProfileInput icon={Lock} type={showNewPassword ? "text" : "password"} name="confirmPassword" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} placeholder="Confirm Password" />
                                <div className="pt-2 flex justify-end"><ActionButton loading={savingPassword}>Update Password</ActionButton></div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;