class repository{
    constructor(dao){
        this.dao = dao
    }
    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, date TEXT, count INTEGER, distance, INTEGER)
        `
        return this.dao.run(sql)
    }
    initData() {
        return this.dao.run(
            `INSERT INTO data (name, date, count, distance) VALUES 
            ("первый", "2007-01-01", 5, 8000),
            ("second", "2001-04-03", 12, 4588),
            ("third", "1991-03-02", 43, 4000),
            ("четвертый", "1999-04-05", 500, 500),
            ("fifth", "1997-04-11", 24, 8009),
            ("sixth", "2020-09-30", 234, 5425),
            ("random1", "2022-09-28", 400, 42255),
            ("random2", "2021-10-15", 1150, 4445),
            ("random6", "1994-12-19", 999, 3004),
            ("test2", "2058-11-21", 342, 5055),
            ("test5", "2010-12-22", 84, 4324),
            ("testt1", "2020-03-23", 94, 4342),
            ("test3", "2005-02-28", 95, 9999),
            ("test4", "2009-04-29", 100, 15001);
            `
        )
    }
    getAll(){
        return this.dao.all(`SELECT * FROM data`)
    }
}

module.exports = repository