import React, {
    useEffect,
    useState
} from "react";

import { socket } from "./services/socket";

function App() {

    const [
        notifications,
        setNotifications
    ] = useState([]);

    useEffect(() => {

        socket.on(
            "new-announcement",
            (announcement) => {

                setNotifications(
                    previous => [
                        announcement,
                        ...previous
                    ]
                );

            }
        );

        return () => {

            socket.off(
                "new-announcement"
            );

        };

    }, []);

    return (

        <div>

            <nav className="navbar">

                <h1>
                    CampusConnect
                </h1>

                <div>
                    ??{" "}
                    {notifications.length}
                </div>

            </nav>

            <main className="container">

                <section className="hero">

                    <h2>
                        College Event &
                        Announcement Portal
                    </h2>

                    <p>
                        Secure Campus
                        Management System
                    </p>

                    <button>
                        Student Dashboard
                    </button>

                </section>

                <section className="cards">

                    <div className="card">

                        <h3>
                            ?? JWT Authentication
                        </h3>

                        <p>
                            Secure login and
                            registration.
                        </p>

                    </div>

                    <div className="card">

                        <h3>
                            ?? RBAC
                        </h3>

                        <p>
                            ADMIN and STUDENT
                            roles.
                        </p>

                    </div>

                    <div className="card">

                        <h3>
                            ? Redis Cache
                        </h3>

                        <p>
                            60-second event
                            caching.
                        </p>

                    </div>

                    <div className="card">

                        <h3>
                            ?? Socket.io
                        </h3>

                        <p>
                            Real-time
                            notifications.
                        </p>

                    </div>

                </section>

                <section className="notifications">

                    <h2>
                        Live Notifications
                    </h2>

                    {notifications.length === 0 ? (

                        <p>
                            Waiting for new
                            announcements...
                        </p>

                    ) : (

                        notifications.map(
                            item => (

                                <div
                                    className="notification"
                                    key={item.id}
                                >

                                    <strong>
                                        {item.title}
                                    </strong>

                                    <p>
                                        {item.message}
                                    </p>

                                </div>

                            )
                        )

                    )}

                </section>

            </main>

        </div>

    );

}

export default App;
