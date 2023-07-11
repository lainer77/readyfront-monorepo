import profile from 'resources/jpg/profile.jpg';

export function Profile() {
    return (
        <a href="/">
            <img
                style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
                alt="profile"
                height={64}
                src={profile}
                width={64}
            />
        </a>
    );
}
