// utils/tag-styles.ts
import { SportsType } from '@/types/sports';

type TagColors = {
    bg: string;
    text: string;
};

const TAG_COLOR_MAP: Record<string, TagColors> = {
    football: { bg: 'bg-blue-100', text: 'text-blue-800' },
    basketball: { bg: 'bg-orange-100', text: 'text-orange-800' },
    tennis: { bg: 'bg-green-100', text: 'text-green-800' },
    swimming: { bg: 'bg-purple-100', text: 'text-purple-800' },
    running: { bg: 'bg-red-100', text: 'text-red-800' },
    cycling: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    cricket: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    default: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

export const getTagColors = (sportsType: SportsType): TagColors => {
    const normalizedType = sportsType.toLowerCase();
    return TAG_COLOR_MAP[normalizedType] || TAG_COLOR_MAP.default;
};