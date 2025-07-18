import { PostListItem } from '@app/components/PostListItem/PostListItem';
import posts from '@assets/data/posts.json' with { type: 'json' };
import { FlatList } from 'react-native';

export default function HomeScreen() {
    return (
        <FlatList
            contentContainerStyle={{ gap: 12 }}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item: post }) => <PostListItem post={post} />}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, padding: 16 }}
        />
    );
}
