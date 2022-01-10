from datetime import datetime, timezone, timedelta;



tz = timezone(offset=timedelta(hours=1))

datetime.now(tz=tz)