import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Calendar, Shield, Edit3, Save, X, LogOut } from 'lucide-react';
import useDocumentTitle from '../utils/useDocumentTitle';

const Profile = () => {
  const { user, logout } = useAuth();
  const toast = useToast();
  useDocumentTitle('My Profile');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    // Future: call userApi.updateProfile(form)
    toast.success('Profile updated successfully!');
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.info('You have been logged out.');
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || '?';

  const isAdmin = user?.roles?.includes('ADMIN');
  const isHost  = user?.roles?.includes('HOTEL_MANAGER');

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Avatar Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center text-white text-3xl font-black shadow-premium mb-4">
            {initials}
          </div>
          <h1 className="text-2xl font-black text-dark dark:text-dark-heading">{user?.name || 'Guest User'}</h1>
          <p className="text-muted dark:text-dark-muted text-sm mt-1">{user?.email}</p>

          {/* Role Badges */}
          <div className="flex gap-2 mt-3">
            {isAdmin && (
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full uppercase tracking-wider">Admin</span>
            )}
            {isHost && (
              <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Host</span>
            )}
            <span className="px-3 py-1 bg-grayBg dark:bg-dark-surface text-muted dark:text-dark-muted text-xs font-bold rounded-full uppercase tracking-wider">Member</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-dark-elevated border border-lightGray dark:border-dark-border rounded-3xl shadow-card overflow-hidden mb-6">
          <div className="flex justify-between items-center px-6 py-4 border-b border-lightGray dark:border-dark-border">
            <h2 className="font-bold text-dark dark:text-dark-heading text-base">Personal Info</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                <Edit3 size={15} /> Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-dark dark:hover:text-dark-text transition-colors">
                  <X size={15} /> Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80 transition-opacity">
                  <Save size={15} /> Save
                </button>
              </div>
            )}
          </div>

          <div className="divide-y divide-lightGray dark:divide-dark-border">
            {/* Name */}
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 rounded-xl bg-grayBg dark:bg-dark-surface flex items-center justify-center shrink-0">
                <User size={16} className="text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-muted dark:text-dark-muted tracking-widest mb-0.5">Full Name</p>
                {editing ? (
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="text-sm font-semibold text-dark dark:text-dark-text bg-grayBg dark:bg-dark-surface rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                ) : (
                  <p className="text-sm font-semibold text-dark dark:text-dark-text">{form.name || '—'}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 rounded-xl bg-grayBg dark:bg-dark-surface flex items-center justify-center shrink-0">
                <Mail size={16} className="text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-muted dark:text-dark-muted tracking-widest mb-0.5">Email</p>
                <p className="text-sm font-semibold text-dark dark:text-dark-text">{user?.email || '—'}</p>
              </div>
            </div>

            {/* Roles */}
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 rounded-xl bg-grayBg dark:bg-dark-surface flex items-center justify-center shrink-0">
                <Shield size={16} className="text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-muted dark:text-dark-muted tracking-widest mb-0.5">Account Role</p>
                <p className="text-sm font-semibold text-dark dark:text-dark-text capitalize">{user?.roles?.join(', ').toLowerCase().replace(/_/g, ' ') || 'User'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 py-4 border-2 border-red-100 dark:border-red-900/40 text-red-500 font-bold rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
