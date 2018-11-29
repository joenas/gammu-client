const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: connectionString,
})

const fetchAllQuery = `
        select
          MD5("ReceivingDateTime" || "SenderNumber" || "TextDecoded") as id,
          "ReceivingDateTime"::text as datetime,
          "SenderNumber" as number,
          "TextDecoded" as text,
          true as incoming,
          true as sent,
          false as read
          from inbox

        UNION ALL

        select
          MD5("SendingDateTime" || "DestinationNumber" || "TextDecoded") as id,
          "SendingDateTime"::text as datetime,
          "DestinationNumber" as number,
          "TextDecoded" as text,
          false as incoming,
          true as sent,
          true as read
          from sentitems

        ORDER BY datetime desc
      `

const createSmsQuery = `
        INSERT
          INTO outbox
            ("CreatorID", "SenderID", "DeliveryReport", "MultiPart","InsertIntoDB", "Text", "DestinationNumber", "RelativeValidity", "Coding", "UDH", "Class", "TextDecoded")
          VALUES
            ('gammu-client', '', 'default', 'false', NOW(), '', $1, 196, 'Unicode_No_Compression', '', 1, $2)
          RETURNING
            MD5("SendingDateTime" || "DestinationNumber" || "TextDecoded") as id,
            "SendingDateTime"::text as datetime,
            "DestinationNumber" as number,
            "TextDecoded" as text,
            false as incoming,
            true as sent,
            true as read
      `

module.exports = {
  query: (text, params) => pool.query(text, params),
  fetchAll: () => pool.query(fetchAllQuery),
  createSms: (number, text) => pool.query(createSmsQuery, [number, text])
}
