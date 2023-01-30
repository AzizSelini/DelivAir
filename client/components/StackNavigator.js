import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "../UserContext";
import Login from "./Login";
import SignUp from "./SingnUp";
import AddPost from "./AddPost";
import Reclamation from "./Reclamation";
import Contact from "./ContactList";
import History from "./History";
import Alert from "./Alert";
import Main from "../src/screens/Main";
import Form from "./Forme";
import Banned from "./BannedUser";
import Unverifed from "./Unverifeduser";
import UserSetting from "./UserSetting";
import Chat from "./Chat";
import Track from "./Track";
import Messages from "./Messages";
import Profile from "./Profiletest";
import OthersProfile from "./OthersProfile";
import Home from "./Home";
import Notices from "./Notices";
import AllPosts from "./AllPosts";

const Stack = createNativeStackNavigator();
const Stacks = () => {
  const { user, connected } = useContext(UserContext);
  useEffect(() => {
    console.log(user, "stack");
  }, [user]);

  if (!user) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="form" component={Form} />
        <Stack.Screen name="notices" component={Notices} />
      </Stack.Navigator>
    );
  } else if (user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="unverfied" component={Unverifed} />
        <Stack.Screen name="otherprofile" component={OthersProfile} />
        <Stack.Screen name="contarct" component={Alert} />
        <Stack.Screen name="setting" component={UserSetting} />
        <Stack.Screen name="home" component={Main} />
        <Stack.Screen name="messages" component={Messages} />
        <Stack.Screen name="banned" component={Banned} />
        <Stack.Screen name="track" component={Track} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="addpost" component={AddPost} />
        <Stack.Screen
          name="contact"
          component={Contact}
          options={{
            headerShown: true,
            title: "DelivAir",
            headerTitleStyle: { fontWeight: "light" },

            headerStyle: { backgroundColor: "#FFC8CE" },
          }}
        />
        <Stack.Screen name="allposts" component={AllPosts} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="reclamation" component={Reclamation} />
        <Stack.Screen name="history" component={History} />
      </Stack.Navigator>
    );
  }
};

export default Stacks;
