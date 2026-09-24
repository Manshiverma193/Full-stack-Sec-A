const request = require("supertest");

const API =
    "http://localhost:5000";

describe(
    "CampusConnect API",
    () => {

        test(
            "Health endpoint",
            async () => {

                const response =
                    await request(API)
                    .get(
                        "/api/health"
                    );

                expect(
                    response.statusCode
                ).toBe(200);

                expect(
                    response.body.status
                ).toBe("OK");

            }
        );

        test(
            "Protected event route",
            async () => {

                const response =
                    await request(API)
                    .get(
                        "/api/events"
                    );

                expect(
                    response.statusCode
                ).toBe(401);

            }
        );

    }
);
