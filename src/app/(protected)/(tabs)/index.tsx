import { FlatList } from 'react-native';
import posts from '../../../../assets/data/posts.json' with { type: 'json' };
import { PostListItem } from '../../../components/PostListItem/PostListItem';

export default function HomeScreen() {
    return (
        <FlatList
            contentContainerStyle={{ gap: 12 }}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item: post }) => <PostListItem post={post} />}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: 'red', padding: 16 }}
        />
    );
}
