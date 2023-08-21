export function Profile() {
    return (
        <a className="profile" href="/">
            <img
                style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
                alt="profile"
                className="clickable"
                height={64}
                src={`${import.meta.env.VITE_CDN_URL}/img/profile.webp`}
                width={64}
            />
        </a>
    );
}
