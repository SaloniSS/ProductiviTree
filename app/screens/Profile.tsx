import React, {useState, useEffect} from "react";
import { Container, Content, Text , View , Button} from "native-base";
import {ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {  LinearGradient }from "expo-linear-gradient";
import {context} from "../context" ;
import ProfileInfo from "../components/ProfileInfo"

const axios = require("axios").default;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Profile = () => {
  let [userID, setUserID] = useState(context._currentValue.googleID);
  let [user, setUser] = useState({});
  let [refreshing, setRefreshing] = useState(false);
  let [userFollowers, setUserFollowers] = useState(0);
  let [userFollowing, setUserFollowing] = useState(0);

  console.log("Profile", userID);

  async function fetchData() {
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${userID}`
    );
    setUser(result.data.payload);
    console.log(result.data.payload.Followers.length);
    await setUserFollowers(result.data.payload.Followers);
    await setUserFollowing(result.data.payload.Following);
    //console.log("User", user);
  } 

  useEffect(() => {
    fetchData();
  }, []);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  function goToSettings() {
    console.log("Settings Page Here");
  }

  return (
    <Container>
      <LinearGradient
        colors={["#C8F0EE", "#A1C6F1"]}
        style={{ flex: 1 }}
        >
          <Content>
            <ScrollView
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              <ProfileInfo user={user} followers={userFollowers} following={userFollowing}/>
              <View>
                <Button style={{justifyContent: "center",alignItems: "center"}} onPress={goToSettings}>
                  <Text>Settings</Text>
                </Button>
              </View>
            </ScrollView >
          </Content>
      </LinearGradient>
    </Container>
  );
};

export default Profile;