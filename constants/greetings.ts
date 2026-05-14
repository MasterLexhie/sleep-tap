const USER_NAME = 'Victoria';

export function getGreeting(): { eyebrow: string; title: string } {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      eyebrow: 'Good morning',
      title: `Rise & rest, ${USER_NAME}`,
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      eyebrow: 'Good afternoon',
      title: `Unwind, ${USER_NAME}`,
    };
  }

  return {
    eyebrow: 'Good evening',
    title: `Sleep well, ${USER_NAME}`,
  };
}
