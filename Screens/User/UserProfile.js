import React, { useContext, useState, useCallback } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';

import { Container } from "native-base"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import AuthGlobal from "../../Context/Store/AuthGlobal"

import { logoutUser } from "../../Context/Actions/Auth.actions"

// Custom Design
import Header from '../../Components/Header';
import Button from '../../Components/Button';

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState('')
    const navigation = useNavigation()
    const [userImage, setUserImage] = useState("")


    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                navigation.navigate("Login")
            }
            console.log(context.stateUser.user)
            
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => {
                          setUserProfile(user.data);
                          setUserImage(user.data.image);
                      })
                })
                .catch((error) => console.log(error))
            return () => {
                setUserProfile(); 
                setUserImage("");
            }

        }, [context.stateUser.isAuthenticated]))

        console.log("image",userImage)

    return (
        <View style={styles.container}>
        <View style={styles.profileContainer}>
        <Header>My Profile</Header>
          <View style={styles.imageContainer}>
            <View style={styles.imageBorder}>
            <Image
                source={{
                  uri: userImage
                    ? userImage
                    : "../../assets/images/default-profile.jpg",
                }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
            />
            </View>
          </View>
          <View style={styles.details}>
            <Text style={styles.nameText}>
              {userProfile ? userProfile.firstname : ''}{' '}
              {userProfile ? userProfile.lastname : ''}
            </Text>
            <Text style={styles.emailText}>
              {userProfile ? userProfile.email : ''}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>

          <TouchableOpacity 
              style={[styles.button, styles.changePasswordButton]}
              onPress={() => {/* Your onPress logic */}}
          >
          <Button mode="outlined">Change Password</Button>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonWrapper}>
          <TouchableOpacity
          style={[styles.button, styles.editProfileButton]}
          onPress={() => navigation.navigate("UserUpdate", {user:userProfile})}
          >
          <Button mode="outlined">Edit Profile</Button>
          </TouchableOpacity>
          </View>
          </View>
          
          </View>

        <View>
        <TouchableOpacity
              onPress={() => [
                AsyncStorage.removeItem('jwt'),
                logoutUser(context.dispatch),
              ]}
            >
              <Button mode="outlined">Logout</Button>
        </TouchableOpacity>
        </View>
        
      </View>
    )
}

export default UserProfile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bfbfbf',
    },
    profileContainer: {
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: 70,
      borderBottomRightRadius: 70,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
    logoutText: {
      fontWeight: 'bold',
      color: '#990000',
    },
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    imageBorder: {
      borderWidth: 2,
      borderColor: '#cdcbcb',
      borderRadius: 100,
      width: 200,
      height: 200,
    },
    details: {
      alignItems: 'center',
      marginTop: 20,
    },
    nameText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    emailText: {
      textAlign: 'center',
      fontSize: 14,
      marginBottom: 7,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      paddingHorizontal: 5,
    },
    buttonWrapper: {
      flex: 1,
      marginHorizontal: 5,
    },

    changePasswordButton: {
      backgroundColor: '#zinc-700', // Adjust the color as needed
      borderRadius: 20,
    },
    editProfileButton: {
      backgroundColor: '#red-500', // Adjust the color as needed
      borderRadius: 20,
    },
  });