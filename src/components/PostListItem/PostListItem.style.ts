import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    postContainer: {
        padding: 16,
        gap: 4,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    groupName: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#3A3B3C',
    },
    groupImage: {
        width: 20,
        aspectRatio: 1,
        borderRadius: 10,
    },
    postDate: {
        color: 'grey',
        fontSize: 13,
        alignSelf: 'flex-start',
    },
    postUserName: {
        fontSize: 13,
        color: '#2E5DAA',
    },
    joinBtn: {
        marginLeft: 'auto',
    },
    joinBtnTitle: {
        backgroundColor: '#0D469B',
        color: 'white',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 12,
        alignItems: 'center',
        fontSize: 13,
    },
    contentContainer: {
        gap: 4,
    },
    postTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 0.5,
    },
    postImage: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 16,
    },
    footerContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    footerStartContents: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    footerEndContents: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        gap: 10,
    },
    footerEndText: {
        color: 'grey',
        fontSize: 13,
    },
    flexRow: {
        flexDirection: 'row',
    },
    iconBox: {
        borderWidth: 0.5,
        borderColor: '#D4D4D4',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    count: {
        fontWeight: '500',
        marginLeft: 5,
        alignSelf: 'center',
    },
    verticalBar: {
        width: 1,
        backgroundColor: '#D4D4D4',
        height: 14,
        marginHorizontal: 7,
        alignSelf: 'center',
    },
});
