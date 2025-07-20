// components/AnimatedTag.tsx
import { motion } from 'framer-motion';
import { getTagColors } from '@/utils/tagStyles';
import { TagItem } from '@/types/sports';

interface AnimatedTagProps {
    item: TagItem;
    index: number;
}

export const AnimatedTag = ({ item, index }: AnimatedTagProps) => {
    const colors = getTagColors(item.sportsType);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className={`absolute top-2 right-2 z-10 text-xs font-mono px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
        >
            {item.sportsType}
        </motion.div>
    );
};