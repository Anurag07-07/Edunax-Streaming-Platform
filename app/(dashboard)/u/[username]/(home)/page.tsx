import { StreamPlayer } from '@/components/stream-player';
import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

interface CreatorPageProps {
  params: { username: string }; // ✅ Correct: no Promise
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const { username } = params; // ✅ No await here

  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
