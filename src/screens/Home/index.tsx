import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

import {Images} from '../../asset/images';
import {ScreenHeight} from '../../common/Constance';
import CheckBox from '../../components/CheckBox';
import CommonStyles from '../../styles/CommonStyles';
import styles from './style';
import {HotelDetailsState, Field} from './types';
import CustomColors from '../../asset/colors';
import {Extract, UserAuthentication} from '../../actions/UserAction';

const HotelList = (hotels: any) => {
  const [selectedHotels, setSelectedHotels] = useState<any>([]);

  const toggleCheckbox = (hotelName: any) => {
    const isSelected = selectedHotels.includes(hotelName);
    if (isSelected) {
      setSelectedHotels(
        selectedHotels.filter((name: any) => name !== hotelName),
      );
    } else {
      setSelectedHotels([...selectedHotels, hotelName]);
    }
  };

  const renderItem = ({item}) => {
    if (
      item.fieldName === 'location' &&
      item.value &&
      item.value.nearByPlaces
    ) {
      const nearbyPlaces = item.value.nearByPlaces;

      return (
        <View>
          {nearbyPlaces.map((items: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={[
                CommonStyles.rowContainerCenter,
                styles.renderItemContainer,
              ]}>
              <CheckBox
                value={selectedHotels.includes(items)}
                onPressCheckBox={() => {
                  toggleCheckbox(items);
                }}
                text={items.place}
                item={`${items.distance} km`}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View
      style={[
        styles.chatLayResponseContainer,
        styles.botResponseContainerMain,
      ]}>
      <TouchableOpacity style={[styles.botResponseContainer]}>
        <Text style={styles.messageText}>
          We found the following places matching your preference. Please choose
          from the available options
        </Text>
        <FlatList
          style={CommonStyles.PV10}
          data={hotels.hotels}
          keyExtractor={item => item.name}
          renderItem={renderItem}
          scrollEnabled={false}
        />
        <View style={{width: '100%'}}>
          <TouchableOpacity style={styles.confirmButtonContainer}
          onPress={()=> console.log("looooooooooooooooooooooooooo")
          
          }
          >
            <Text style={styles.confirmButton}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Home = ({route}) => {
  const {EncUserId} = route.params;
  const [isVisibleMsg, setVisibleMsg] = useState<boolean>(false);
  const [isVisibleTextBox, setVisibleTextBox] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0);
  const [isHotelBooking, setHotelBooking] = useState<boolean>(false);
  const [isOutstandingDetails, setOutstandingDetails] =
    useState<boolean>(false);
  const [responseData, setResponseData] = useState<Field[]>([]);
  const [context, setContext] = useState(0);

  const backendHotelNames = [
    {name: 'Hotel A', kms: 5},
    {name: 'Hotel B', kms: 10},
    {name: 'Hotel C', kms: 15},
    {name: 'Hotel D', kms: 5},
    {name: 'Hotel E', kms: 10},
    {name: 'Hotel F', kms: 15},
  ];

  const questions = [
    'Question 1',
    'Question 2',
    'Kindly provide your intended check-in and check-out dates.',
    'Kindly provide your intended check-in and check-out dates.',
    'Question 5',
    'Question 6',
    'Question 7',
    'Question 8',
    'Question 9',
    'Q10',
    'Q11',
    'Can you please tell me the count of adults and children in your group? ',
    ' Can you please tell me the count of adults and children in your group?',
    'Q14',
    'Q15',
    'Q16',
  ];

  interface Message {
    text: string;
    type: 'user' | 'bot';
    responsetype: 'hotel' | 'select' | 'normal';
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const userAuthentication = () => {
    const param = {
      EncUserId: EncUserId,
    };
    UserAuthentication(param)?.then(result => {
      if (result.StatusMessage === 'Success') {
      }
    });
  };

  const HotelBookingDetails = () => {
    const param = {
      context: context,
      query: inputText,
      isUser: true,
      key: 0,
    };
    Extract(param)?.then(result => {
      console.log('result =>', result);
      setResponseData(result.data);
    });
  };

  console.log('inputText =>', inputText);

  const handleSendMessage = () => {
    const response = generateResponse(inputText);

    const userMessage: any = {text: inputText, type: 'user'};
    let responsetype = '';
    console.log('userMessage', userMessage);
    HotelBookingDetails();
    // if (response.toLowerCase().includes('hotel booking')) {
    //   HotelBookingDetails();
    //   responsetype = 'hotel';
    //   ('IS FEILD NOT ====');
    // } else if (response.toLowerCase().includes('outstanding details')) {
    //   // responsetype = 'select';
    //   // callApi();
    // }
    const botMessage: any = {
      text: response,
      type: 'bot',
      // responsetype: responsetype,
    };
    setMessages([...messages, userMessage, botMessage]);
    setInputText('');
  };

  console.log('message =>', messages);

  const generateResponse = (userMessage: any): any => {
    console.log('userMessage =>', userMessage);

    // if (userMessage.toLowerCase().includes('hotel booking')) {
    //   console.log('jjjjjjjjjjjjjjjjj');

    //   return 'Please Select: Hotel Booking, Outstanding details';
    // } else if (userMessage.toLowerCase().includes('outstanding details')) {
    //   console.log('llllllllllllllllllllll');

    //   return 'Please provide the outstanding details.';
    // } else {
    //   console.log('pppppppppppppppppppppp');

    //   return 'I did not understand. Please Select: Hotel Booking, Outstanding details';
    // }
  };

  const MessagePopup = () => {
    const MessageContainer = (props: any) => {
      const {
        messageText,
        messageTextStyle,
        messageTextOne,
        messageTextTwo,
        messageTextThree,
        messageTextFour,
      } = props;
      return (
        <>
          <View
            style={[
              styles.chatLayResponseContainer,
              styles.botResponseContainerMain,
            ]}>
            <TouchableOpacity style={[styles.botResponseContainer]}>
              <Text style={[styles.messageText, messageTextStyle]}>
                {messageText}
              </Text>
              {messageTextOne && (
                <Text style={[styles.messageText, messageTextStyle]}>
                  {messageTextOne}
                </Text>
              )}
              {messageTextTwo && (
                <Text style={[styles.messageText, messageTextStyle]}>
                  {messageTextTwo}
                </Text>
              )}
              {messageTextThree && (
                <Text style={[styles.messageText, messageTextStyle]}>
                  {messageTextThree}
                </Text>
              )}
              {messageTextFour && (
                <Text style={[styles.messageText, messageTextStyle]}>
                  {messageTextFour}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      );
    };

    const OnPressLayoutConatiner = () => {
      return (
        <View>
          {isHotelBooking && (
            <MessageContainer
              messageText="Certainly! I'd be delighted to assist you with
                    your hotel booking"
            />
          )}
          {isHotelBooking && (
            <MessageContainer
              messageText="Please provide me with your check-in and check-out
                    dates, preferred location, and any specific
                    requirements you have in mind."
            />
          )}
          {isOutstandingDetails && (
            <MessageContainer
              messageText="Of course, I'd be happy to help you with your
                    outstanding details.What details are you looking
                    for?"
            />
          )}
        </View>
      );
    };

    const LayoutContainer = () => {
      return (
        <View
          style={[
            styles.chatLayResponseContainer,
            styles.botResponseContainerMain,
          ]}>
          <TouchableOpacity style={[styles.botResponseContainer]}>
            <TouchableOpacity
              style={styles.responseTypeHeader}
              onPress={() => {
                setHotelBooking(true);
                setOutstandingDetails(false);
              }}>
              <Text style={[styles.ResponseTypeText, CommonStyles.whiteColor]}>
                HOTEL BOOKING
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.responseTypeHeader}
              onPress={() => {
                setOutstandingDetails(true);
                setHotelBooking(false);
              }}>
              <Text style={[styles.ResponseTypeText, CommonStyles.whiteColor]}>
                OUTSTANDING DETAILS
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      );
    };

    console.log('isHotelBooking ----------->', isHotelBooking);

    const ChatBox = () => {
      const FilterAllNullValues = responseData.every(
        item => item.value === null,
      );

      const data = responseData.map((num, index) => ({
        number: num,
        question: questions[index],
      }));

      const printQuestionsForNullValues = () => {
        data.forEach(item => {
          // Check if the field is mandatory and its value is null
          if (item.number.type === 'mandatory' && item.number.value === null) {
            console.log(
              `Field: ${item.number.fieldName}, Question: ${item.question}`,
            );
          }
        });
      };

      printQuestionsForNullValues();

      const renderQuestions = () => {
        const displayedQuestions: any = [];
        return data.map((item, index) => {
          const {fieldName, type, value} = item.number;
          console.log('itemmmmmmmmmmmmmmmmmmmmmmmmm =============>', item);
          if (
            fieldName === 'hotel' ||
            fieldName === 'checkOutDate' ||
            fieldName === 'childCount' ||
            fieldName === 'agent' ||
            fieldName === 'noOfRooms' ||
            fieldName === 'isExtraBed' ||
            fieldName === 'occupancy' ||
            fieldName === 'rateType'
          ) {
            return null;
          }
          // if (
          //   (fieldName === 'checkInDate' || fieldName === 'checkOutDate') &&
          //   !displayedQuestions.includes(item.question)
          // ) {
          //   if (type === 'mandatory' && value === null) {
          //     displayedQuestions.push(item.question); // Add the question to the displayed list
          //     return (
          //       <Text key={index}>
          //         {` Check-out: ${item.question}`}
          //       </Text>
          //     );
          //   }
          // }
          if (type === 'mandatory' && value === null) {
            return <MessageContainer messageText={`${item.question}`} />;
          }

          return null;
        });
      };

      console.log(data, 'data ===========>');

      return (
        <>
          {/* {message.responsetype === 'hotel' && ( */}
          {/* )} */}
          <OnPressLayoutConatiner />
          {responseData.map((feild, index) => {
            <View key={index}>
              {feild.value === null && (
                <MessageContainer messageText={"Sorry I didn't get that."} />
              )}
            </View>;
          })}
          {messages.map((message, index) => (
            <>
              {FilterAllNullValues && (
                //  {message.responsetype === 'hotel' && (
                <>
                  <MessageContainer messageText={'Please Select'} />
                  <LayoutContainer />
                  <OnPressLayoutConatiner />
                </>
              )}
              {/* {data.map((item,index)=> (
                <Text key={index}>
                  Number:{item.question}
                </Text>
              ))} */}
              {/* {renderQuestions()} */}
              {/* )} */}
              {responseData.map((response, index) => (
                <>
                  {/* {message.responsetype === 'select' &&
                        // responseData !== undefined && (
                        //  {responseData.map((feild,index) => { */}

                  <View key={index}>
                    {/* <MessageContainer
                            key={index}
                            messageText={
                              'Thank you, I have got these informations:'
                            }
                          /> */}
                    {/* {
                     ( responseData[2]?.fieldName === "checkInDate" &&  responseData[2]?.value !== null  || responseData[3]?.fieldName === "checkOutDate" &&  responseData[3]?.value !== null ) && */}
                    {(response.fieldName === 'checkInDate' &&
                      response.value !== null) ||
                      (response.fieldName === 'checkOutDate' &&
                        response.value !== null && (
                          <MessageContainer
                            messageText={`${'Check In Date'}      :   ${
                              responseData[2]?.value
                            }`}
                            messageTextOne={`${'Check Out Date'}  :   ${
                              responseData[3]?.value
                            }`}
                            messageTextTwo={`${'No Of Adults'}       :   ${
                              responseData[11]?.value
                            }`}
                            messageTextThree={`${'No Of Children'}    :   ${
                              responseData[12]?.value
                            }`}
                          />
                        ))}
                    {/* } */}
                    {response.fieldName === 'location' &&
                      response.value !== null && (
                        <HotelList hotels={responseData} />
                      )}
                    {/* <MessageContainer
                            messageText={
                              'Kindly provide your intended check-in and check-out dates. '
                            }
                          /> */}
                  </View>
                </>
              ))}
              {renderQuestions()}
              {/* })}
                )} */}
              <View
                style={[
                  styles.chatLayResponseContainer,
                  message.type === 'user' && styles.userResponseContainerMain,
                ]}>
                <TouchableOpacity
                  style={[
                    message.type === 'user' && styles.userResponseContainer,
                  ]}>
                  <Text
                    key={index}
                    style={[
                      styles.messageText,
                      message.type === 'user' && CommonStyles.whiteColor,
                    ]}>
                    {message.type === 'user' && `${message.text}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ))}
        </>
      );
    };

    return (
      <Modal
        isVisible={isVisibleMsg}
        deviceHeight={ScreenHeight}
        onBackButtonPress={() => setVisibleMsg(false)}
        onBackdropPress={() => setVisibleMsg(false)}
        style={[styles.modal, keyboardHeight == 0 && {bottom: 0}]}>
        <View style={[styles.overLay]}>
          <View style={styles.innerLay}>
            <View style={styles.headerContainerMain}>
              <Image source={Images.roboIcon} style={styles.roboIcon} />
              <Text style={[styles.reminderText]}>Booking Assist</Text>
              <View style={styles.headerContainer}>
                <TouchableOpacity style={CommonStyles.rowDireaction}>
                  <Text style={CommonStyles.redColor}>Make My Trip</Text>

                  <Image source={Images.arrowIcon} />
                </TouchableOpacity>
                <Text style={styles.indiaText}>India</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setVisibleTextBox(false);
                  setVisibleMsg(false);
                }}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={[styles.chatLay]}>
              <MessageContainer messageText="Hi, there! We are here to help you out" />
              <LayoutContainer />
              <ChatBox />
            </View>
          </ScrollView>
        </View>

        <View
          style={[
            styles.textBoxContainer,
            keyboardHeight == 0 ? {bottom: 0} : {bottom: 170},
          ]}>
          <View style={CommonStyles.W80}>
            <TextInput
              style={styles.loginTextBox}
              placeholder="Enter a message"
              placeholderTextColor={CustomColors.grey}
              onChangeText={text => setInputText(text)}
              value={inputText}
            />
          </View>
          <TouchableOpacity
            style={styles.sendIconContainer}
            onPress={handleSendMessage}>
            <Image source={Images.sendIcon} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </Modal>
    );
  };
  console.log('isvisiblemsg ========>', isVisibleMsg);

  return (
    <View style={CommonStyles.fullFlex}>
      <View style={CommonStyles.fullPaddingContainer}>
        <View style={styles.searchBarConatiner}>
          <TextInput style={styles.input} placeholder="Search" />
          <Image
            source={Images.searchIcon}
            tintColor={CustomColors.PrimaryColor}
          />
        </View>
        <View style={CommonStyles.rowCenterContainer}>
          <TouchableOpacity
            style={[styles.tileReminder, styles.optionsListContainer]}>
            <Text style={styles.reminderText}>Quotation List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tileReminder,
              CommonStyles.lemonyellowBackgroundColor,
            ]}>
            <Text style={styles.reminderText}>Booking List</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.messageScreen}
        onPress={() => {
          setVisibleMsg(true);
          setVisibleTextBox(true);
          // userAuthentication();
        }}>
        <Image source={Images.messageIcon} style={styles.messageIcon} />
      </TouchableOpacity>

      {MessagePopup()}
    </View>
  );
};

export default Home;
