

export interface NewUserRespones {
    id: string;
    name: string;
    email: string;

}


export type AuthStackParamList = {
    SignUp: undefined;
    SignIn: undefined;
    LostPassword: undefined;
    Verification: {userInfo: NewUserRespones};
}



// This is the type declaration for navigation of ProfileNavigator
export type ProfileNavigatorStackParamList = {
    Profile: undefined;
    ProfileSettings: undefined;
      Verification: {userInfo: NewUserRespones};
}