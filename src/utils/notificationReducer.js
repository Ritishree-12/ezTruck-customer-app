import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookingConfirmationNotificationData: null,
  bookingNotificationReceived: false,

  driverArrivedNotificationData: null,
  driverArrivedNotificationReceived: false,

  dropOffCompleted: false
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    bookingNotificationReceivedSuccess: (state, action) => {
      state.bookingConfirmationNotificationData = action.payload;
      state.bookingNotificationReceived = true;
    },

    driverArrivedNotificationReceivedSuccess: (state, action) => {
      state.driverArrivedNotificationData = action.payload;
      state.driverArrivedNotificationReceived = true;
    },

    clearBookingNotification: (state) => {
      state.bookingConfirmationNotificationData = null;
      state.bookingNotificationReceived = false;
    },

    clearDriverArrivedNotification: (state) => {
      state.driverArrivedNotificationData = null;
      state.driverArrivedNotificationReceived = false;
    },

    customerDriverDropoffCompleted :(state) => {
      state.dropOffCompleted = true;
    },

    clearDropOff: (state) => {
      state.dropOffCompleted = false
    }

  },
});

export const { bookingNotificationReceivedSuccess, 
               driverArrivedNotificationReceivedSuccess,
               clearBookingNotification, 
               clearDriverArrivedNotification,
               customerDriverDropoffCompleted,
               clearDropOff} = notificationSlice.actions;
export default notificationSlice.reducer;