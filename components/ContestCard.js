const handleBellClick = async (contestId) => {
  try {
    const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
    const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
    let notifications = userData.notifications || {};

    // If notification already exists for this contest, remove it completely
    if (notifications[contestId]) {
      // Delete the notification entry completely instead of just disabling it
      delete notifications[contestId];
      toast.success('Notification disabled');
    } else {
      // Only show reminder dialog if we're enabling a new notification
      toast.message("Set reminder time", {
        action: {
          label: "Set",
          onClick: async (reminderTime) => {
            notifications[contestId] = {
              reminderTime: reminderTime || 15,
              contestTime: contest.startTime
            };
            await setDoc(doc(db, 'userPreferences', currentUser.uid), {
              notifications
            }, { merge: true });
            toast.success('Notification enabled');
          },
        },
        description: "Minutes before contest start",
        duration: 5000,
      });
      return;
    }

    // Update Firestore
    await setDoc(doc(db, 'userPreferences', currentUser.uid), {
      notifications
    }, { merge: true });
  } catch (error) {
    console.error('Error toggling notification:', error);
    toast.error('Failed to update notification');
  }
}; 