import React, { useState } from "react";
import {
  Save,
  Lock,
  Bell,
  Book,
  Users,
  Clock,
  Database,
  Mail,
} from "lucide-react";

const Setting = () => {
  const [generalSettings, setGeneralSettings] = useState({
    libraryName: "AASTU Engineering Library",
    email: "admin@aastuengineeringlibrarary.com",
    phone: "+251-912-345-678",
    address: "Block 56",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiration: 90,
    loginAttempts: 5,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    overdueReminders: true,
    newArrivalsAlert: true,
  });

  const [bookSettings, setBookSettings] = useState({
    loanPeriod: 14,
    maxRenewals: 2,
    lateFeePerDay: 0.5,
    maxBooksPerUser: 5,
  });

  const [userSettings, setUserSettings] = useState({
    allowSelfRegistration: true,
    requireAddressVerification: false,
    membershipDuration: 365,
  });

  const handleGeneralSettingsChange = (e) => {
    setGeneralSettings({ ...generalSettings, [e.target.name]: e.target.value });
  };

  const handleSecuritySettingsChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSecuritySettings({ ...securitySettings, [e.target.name]: value });
  };

  const handleNotificationSettingsChange = (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleBookSettingsChange = (e) => {
    setBookSettings({
      ...bookSettings,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleUserSettingsChange = (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : parseInt(e.target.value);
    setUserSettings({ ...userSettings, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", {
      generalSettings,
      securitySettings,
      notificationSettings,
      bookSettings,
      userSettings,
    });
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 h-[100vh] overflow-y-auto scrollbar-hide">
      <h1 className="text-3xl font-bold text-[#1a365d] mb-6">Admin Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#1a365d] mb-4 flex items-center">
            <Database className="mr-2" /> General Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="libraryName"
                className="block text-sm font-medium text-gray-700"
              >
                Library Name
              </label>
              <input
                type="text"
                id="libraryName"
                name="libraryName"
                value={generalSettings.libraryName}
                onChange={handleGeneralSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={generalSettings.email}
                onChange={handleGeneralSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={generalSettings.phone}
                onChange={handleGeneralSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={generalSettings.address}
                onChange={handleGeneralSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#1a365d] mb-4 flex items-center">
            <Lock className="mr-2" /> Security Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="twoFactorAuth"
                name="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onChange={handleSecuritySettingsChange}
                className="h-4 w-4 text-[#1a365d] focus:ring-[#1a365d] border-gray-300 rounded"
              />
              <label
                htmlFor="twoFactorAuth"
                className="ml-2 block text-sm text-gray-900"
              >
                Enable Two-Factor Authentication
              </label>
            </div>
            <div>
              <label
                htmlFor="passwordExpiration"
                className="block text-sm font-medium text-gray-700"
              >
                Password Expiration (days)
              </label>
              <input
                type="number"
                id="passwordExpiration"
                name="passwordExpiration"
                value={securitySettings.passwordExpiration}
                onChange={handleSecuritySettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
            <div>
              <label
                htmlFor="loginAttempts"
                className="block text-sm font-medium text-gray-700"
              >
                Max Login Attempts
              </label>
              <input
                type="number"
                id="loginAttempts"
                name="loginAttempts"
                value={securitySettings.loginAttempts}
                onChange={handleSecuritySettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#1a365d] mb-4 flex items-center">
            <Bell className="mr-2" /> Notification Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationSettingsChange}
                className="h-4 w-4 text-[#1a365d] focus:ring-[#1a365d] border-gray-300 rounded"
              />
              <label
                htmlFor="emailNotifications"
                className="ml-2 block text-sm text-gray-900"
              >
                Enable Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                name="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={handleNotificationSettingsChange}
                className="h-4 w-4 text-[#1a365d] focus:ring-[#1a365d] border-gray-300 rounded"
              />
              <label
                htmlFor="smsNotifications"
                className="ml-2 block text-sm text-gray-900"
              >
                Enable SMS Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="overdueReminders"
                name="overdueReminders"
                checked={notificationSettings.overdueReminders}
                onChange={handleNotificationSettingsChange}
                className="h-4 w-4 text-[#1a365d] focus:ring-[#1a365d] border-gray-300 rounded"
              />
              <label
                htmlFor="overdueReminders"
                className="ml-2 block text-sm text-gray-900"
              >
                Send Overdue Reminders
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newArrivalsAlert"
                name="newArrivalsAlert"
                checked={notificationSettings.newArrivalsAlert}
                onChange={handleNotificationSettingsChange}
                className="h-4 w-4 text-[#1a365d] focus:ring-[#1a365d] border-gray-300 rounded"
              />
              <label
                htmlFor="newArrivalsAlert"
                className="ml-2 block text-sm text-gray-900"
              >
                Send New Arrivals Alerts
              </label>
            </div>
          </div>
        </div>

        {/* Book Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#1a365d] mb-4 flex items-center">
            <Book className="mr-2" /> Book Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="loanPeriod"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Period (days)
              </label>
              <input
                type="number"
                id="loanPeriod"
                name="loanPeriod"
                value={bookSettings.loanPeriod}
                onChange={handleBookSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
            <div>
              <label
                htmlFor="maxRenewals"
                className="block text-sm font-medium text-gray-700"
              >
                Max Renewals
              </label>
              <input
                type="number"
                id="maxRenewals"
                name="maxRenewals"
                value={bookSettings.maxRenewals}
                onChange={handleBookSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
            <div>
              <label
                htmlFor="lateFeePerDay"
                className="block text-sm font-medium text-gray-700"
              >
                Late Fee Per Day ($)
              </label>
              <input
                type="number"
                id="lateFeePerDay"
                name="lateFeePerDay"
                value={bookSettings.lateFeePerDay}
                onChange={handleBookSettingsChange}
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
            <div>
              <label
                htmlFor="maxBooksPerUser"
                className="block text-sm font-medium text-gray-700"
              >
                Max Books Per User
              </label>
              <input
                type="number"
                id="maxBooksPerUser"
                name="maxBooksPerUser"
                value={bookSettings.maxBooksPerUser}
                onChange={handleBookSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
          </div>
        </div>

        {/* User Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#1a365d] mb-4 flex items-center">
            <Users className="mr-2" /> User Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowSelfRegistration"
                name="allowSelfRegistration"
                checked={userSettings.allowSelfRegistration}
                onChange={handleUserSettingsChange}
                className="h-4 w-4 text-[#1a365d] focus:ring-[#1a365d] border-gray-300 rounded"
              />
              <label
                htmlFor="allowSelfRegistration"
                className="ml-2 block text-sm text-gray-900"
              >
                Allow Self Registration
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireAddressVerification"
                name="requireAddressVerification"
                checked={userSettings.requireAddressVerification}
                onChange={handleUserSettingsChange}
                className="h-4 w-4 text-[#1a365d] focus:ring-[#1a365d] border-gray-300 rounded"
              />
              <label
                htmlFor="requireAddressVerification"
                className="ml-2 block text-sm text-gray-900"
              >
                Require Address Verification
              </label>
            </div>
            <div>
              <label
                htmlFor="membershipDuration"
                className="block text-sm font-medium text-gray-700"
              >
                Membership Duration (days)
              </label>
              <input
                type="number"
                id="membershipDuration"
                name="membershipDuration"
                value={userSettings.membershipDuration}
                onChange={handleUserSettingsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a365d] focus:border-[#1a365d]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#1a365d] text-white rounded-md hover:bg-[#14294d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d] flex items-center"
          >
            <Save className="mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
