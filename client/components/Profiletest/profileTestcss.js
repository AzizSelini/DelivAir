import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 0;
`;

export const Header = styled(Animated.View)`
  width: 100%;
  height: 250px;
  align-items: center;
  background: #ffc8ce;
`;

export const HeaderInfoText = styled(Animated.Text)`
  color: #36454f;
  font-size: 16px;
  margin-top: 40px;
`;

export const HeaderContent = styled(Animated.View)`
  width: 85%;
  height: 200px;
  border-radius: 20px;
  margin-top: -200px;
  align-items: center;
  padding-top: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
`;

export const HeaderText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  opacity: ${({ bold }) => (bold ? 1 : 0.7)};
`;

export const Logo = styled.Image`
  height: 200px;
  width: 200px;
  margin-bottom: 10px; ;
`;

export const FlyInfo = styled(Animated.View)`
  width: 85%;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -125px;
`;
export const FlyInfoTwo = styled(Animated.View)`
  width: 85%;
  margin-top: 30px;
`;
export const FlyInfoThree = styled(Animated.View)`
  width: 85%;
  margin-top: 30px;
`;

export const FlyInfoFour = styled(Animated.View)`
  width: 85%;
  margin-top: 30px;
`;

export const FlyInfoContent = styled(BlurView)`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const TextRowContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextContent = styled.View`
  align-items: ${({ alingment = "left" }) =>
    alingment === "left" ? "flex-start" : "flex-end"};
`;

export const HourContent = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 8px;
`;

export const SmallText = styled.Text`
  color: white;
  margin-top: ${({ mt }) => (mt ? mt : 0)}px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  opacity: ${({ mt }) => (mt ? 1 : 0.8)};
`;

export const LargeText = styled.Text`
  color: black;
  font-size: 35px;
`;

export const TicketInfo = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  align-items: center;
  margin-top: 300px;
`;

export const TicketView = styled.View`
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  padding-top: 15px;
`;

export const Desc = styled.Text`
  color: gray;
  margin-bottom: 3px;
`;

export const Value = styled.Text`
  color: black;
`;

export const Duration = styled.Text`
  color: black;
`;

export const Row = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const ColumnView = styled.View`
  flex: 1;
`;

export const Profile = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export const TotalText = styled.Text`
  color: gray;
  width: 100%;
  text-align: left;
  margin-top: 40px;
`;

export const TotalValue = styled.Text`
  color: gray;
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;
