import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return;
        }

        if (!(emailAddress && password)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signUp.create({
                emailAddress,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err: unknown) {
            Alert.alert(
                'Error',
                (err as { errors?: [{ message?: string | undefined }] })?.errors?.[0]?.message || 'Something went wrong'
            );
        } finally {
            setLoading(false);
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) {
            return;
        }

        if (!verificationCode) {
            Alert.alert('Error', 'Please enter the verification code');
            return;
        }

        setLoading(true);
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
            }
        } catch (err: unknown) {
            Alert.alert(
                'Error',
                (err as { errors?: [{ message?: string | undefined }] })?.errors?.[0]?.message ||
                    'Invalid verification code'
            );
        } finally {
            setLoading(false);
        }
    };

    if (pendingVerification) {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.appName}>Redly</Text>
                            <Text style={styles.title}>Verify Your Email</Text>
                            <Text style={styles.subtitle}>We've sent a verification code to {emailAddress}</Text>
                        </View>

                        <View style={styles.form}>
                            <TextInput
                                keyboardType="number-pad"
                                maxLength={6}
                                onChangeText={setVerificationCode}
                                placeholder="Enter verification code"
                                style={[styles.input, styles.verificationInput]}
                                textAlign="center"
                                value={verificationCode}
                            />

                            <TouchableOpacity
                                disabled={loading}
                                onPress={onVerifyPress}
                                style={[styles.button, loading && styles.buttonDisabled]}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Verify Email</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.appName}>Redly</Text>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join the conversation</Text>
                    </View>

                    <View style={styles.form}>
                        <TextInput
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                            onChangeText={setEmailAddress}
                            placeholder="Email address"
                            style={styles.input}
                            value={emailAddress}
                        />

                        <TextInput
                            autoComplete="password-new"
                            onChangeText={setPassword}
                            placeholder="Password"
                            secureTextEntry={true}
                            style={styles.input}
                            value={password}
                        />

                        <TouchableOpacity
                            disabled={loading}
                            onPress={onSignUpPress}
                            style={[styles.button, loading && styles.buttonDisabled]}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Continue</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <Link asChild href="/signIn">
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Sign In</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    appName: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ff4500',
        marginBottom: 16,
        letterSpacing: -1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1b',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#7c7c83',
        textAlign: 'center',
    },
    form: {
        gap: 16,
        marginBottom: 32,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: '#edeff1',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    verificationInput: {
        fontSize: 24,
        letterSpacing: 8,
        fontWeight: '600',
    },
    button: {
        height: 56,
        backgroundColor: '#ff4500',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#7c7c83',
    },
    linkText: {
        fontSize: 16,
        color: '#ff4500',
        fontWeight: '600',
    },
});
