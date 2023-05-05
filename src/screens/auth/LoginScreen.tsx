import { Controller } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { useLoginScreen } from 'src/screens/auth/LoginScreen.hook';
import { Colors } from 'src/utils/colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export function LoginScreen() {
  const { control, handleSubmit } = useLoginScreen();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <FontAwesome5 style={{ marginRight: 10 }} name="hippo" size={80} />
      </View>
      <View>
        <Text style={styles.label}>Email address</Text>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              <Text style={{ color: 'red', paddingTop: 4 }}>
                {error ? error.message : ''}
              </Text>
            </>
          )}
          name="email"
          rules={{
            required: true,
            minLength: { message: 'Min length is 5', value: 5 },
          }}
        />
        <Text style={styles.label}>Last name</Text>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              <Text style={{ color: 'red', paddingTop: 4 }}>
                {error ? error.message : ''}
              </Text>
            </>
          )}
          name="password"
          rules={{
            required: true,
            minLength: { message: 'Min length is 3', value: 3 },
          }}
        />

        <View style={styles.button}>
          <Button title="Login" color={Colors.white} onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    marginLeft: 0,
    fontWeight: '500',
    paddingBottom: 5,
  },
  button: {
    marginTop: 40,
    color: 'white',
    backgroundColor: Colors.black,
    borderRadius: 10,
    padding: 6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: 20,
  },
  input: {
    backgroundColor: '#eeeeee',
    borderColor: 'transparent',
    height: 46,
    padding: 10,
    borderRadius: 10,
  },
});
