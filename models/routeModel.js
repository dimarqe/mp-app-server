const pool = require('../config/dbConnection');

class Route {
    constructor(route) {
        this.routeID = route.routeID;
        this.description = route.description;
        this.fee = route.fee;
    }

    static save(route, result) {
        pool.query("insert into route (description, fee) values ($1, $2) returning route_id",
            [route.description, route.fee], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc.rows[0]);
                }
            });
    }

    static findByID(routeID, result) {
        pool.query("select * from route where route_id = $1", [routeID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows[0]);
            }
        });
    }

    static findAll(result) {
        pool.query("select * from route order by route_id asc", (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc.rows);
            }
        });
    }

    static updateRoute(route, result) {
        pool.query("update route set description = $1, fee = $2 where route_id = $3",
            [route.description, route.fee, route.routeID], (err, doc) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, doc);
                }
            });
    }

    static delete(routeID, result) {
        pool.query("delete from route where route_id = $1", [routeID], (err, doc) => {
            if (err) {
                result(err, null);
            }
            else {
                result(null, doc);
            }
        });
    }
}

module.exports = Route;