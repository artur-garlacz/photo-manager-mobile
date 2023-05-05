import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { User } from 'src/types';
import { Avatar } from 'react-native-paper';
import { useGetUserQuery } from 'src/store/actions';

type UserBriefViewProps = {
  userId: User['id'];
  extendedView?: boolean;
};

export function UserBriefView({
  userId,
  extendedView = false,
}: UserBriefViewProps) {
  const { data, isLoading } = useGetUserQuery(userId);

  if (!data || isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={40}
        style={{ borderRadius: 6, backgroundColor: 'transparent' }}
        source={require('../../assets/images/avatar1.png')}
      />
      <Text style={styles.name}>{data.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
    color: 'gray',
  },
});
