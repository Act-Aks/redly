import type { Post } from '@app/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './PostListItem.style';

type PostListItemProps = {
    post: Post;
    isDetailedPost?: boolean;
};

export const PostListItem: React.FC<PostListItemProps> = ({ post, isDetailedPost }) => {
    return (
        <Link href={`/post/${post.id}`}>
            <View style={styles.postContainer}>
                <View style={styles.headerContainer}>
                    <Image source={{ uri: post.group.image }} style={styles.groupImage} />
                    <View style={{ gap: 4, flexDirection: 'row' }}>
                        <Text style={styles.groupName}>{post.group.name}</Text>
                        <Text style={styles.postDate}>{formatDistanceToNowStrict(new Date(post.created_at))}</Text>
                        {isDetailedPost && <Text style={styles.postUserName}>{post.user.name}</Text>}
                    </View>
                    <Pressable
                        onPress={() => {
                            console.warn('click');
                        }}
                        style={styles.joinBtn}
                    >
                        <Text style={styles.joinBtnTitle}>Join</Text>
                    </Pressable>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
                    {post.description && !post.image && (
                        <Text numberOfLines={isDetailedPost ? undefined : 4}>{post.description}</Text>
                    )}
                </View>

                <View style={styles.footerContainer}>
                    <View style={styles.footerStartContents}>
                        <View style={[styles.flexRow, styles.iconBox]}>
                            <MaterialCommunityIcons color={'black'} name={'arrow-up-bold-outline'} size={20} />
                            <Text style={styles.count}>{post.upvotes}</Text>
                            <View style={styles.verticalBar} />
                            <MaterialCommunityIcons color={'black'} name={'arrow-down-bold-outline'} size={20} />
                        </View>
                        <View style={[styles.flexRow, styles.iconBox]}>
                            <MaterialCommunityIcons color={'black'} name={'comment-outline'} size={20} />
                            <Text style={styles.count}>{post.nr_of_comments}</Text>
                        </View>
                    </View>
                    <View style={styles.footerEndContents}>
                        <MaterialCommunityIcons
                            color={'black'}
                            name={'trophy-outline'}
                            size={20}
                            style={styles.iconBox}
                        />
                        <MaterialCommunityIcons
                            color={'black'}
                            name={'share-outline'}
                            size={20}
                            style={styles.iconBox}
                        />
                    </View>
                </View>
            </View>
        </Link>
    );
};
