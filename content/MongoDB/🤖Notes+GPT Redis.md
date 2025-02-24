

# **🔑 Redis Notes**

## **What is Redis?**

- **Redis** is an **open-source, in-memory data structure store**.
- It supports various data structures like strings, hashes, lists, sets, and sorted sets with range queries.
- It is often used for **caching** and **session management**.

---

## **🧠 Redis Use Cases**

- **Caching**: Store frequently accessed data to reduce latency and load on your primary data store.
- **Session Management**: Ideal for storing user sessions in web applications.
- **Real-time Data**: Store counters, leaderboards, or real-time events.
- **Message Queue**: Redis can be used as a message broker or queue system (e.g., with Redis Pub/Sub).

---

## **🚀 How Redis Works**

- **In-memory**: Redis stores all data in memory (RAM), which makes it **extremely fast**.
- **Persistence**: Redis can optionally persist data to disk using RDB snapshots or AOF (Append-Only File).

---

## **🔧 Redis Data Structures**

1. **String**: The simplest data type (e.g., key-value pairs).  
    Example:
    
    ```bash
    SET mykey "Hello Redis"
    GET mykey  # Returns: "Hello Redis"
    ```
    
2. **Hash**: Stores a collection of key-value pairs (e.g., user profiles).  
    Example:
    
    ```bash
    HSET user:1000 name "Gaurav" age 25
    HGET user:1000 name  # Returns: "Gaurav"
    ```
    
3. **List**: A collection of ordered items (e.g., task queue).  
    Example:
    
    ```bash
    LPUSH tasks "task1"
    RPUSH tasks "task2"
    LPOP tasks  # Removes and returns "task1"
    ```
    
4. **Set**: An unordered collection of unique items (e.g., unique user IDs).  
    Example:
    
    ```bash
    SADD tags "tech" "coding" "python"
    SMEMBERS tags  # Returns: ["tech", "coding", "python"]
    ```
    
5. **Sorted Set**: A collection of unique items with scores (e.g., leaderboard).  
    Example:
    
    ```bash
    ZADD leaderboard 100 "Alice" 90 "Bob"
    ZRANGE leaderboard 0 -1  # Returns: ["Alice", "Bob"]
    ```
    

---

## **⚡️ Redis Commands**

- **SET**: Store data in Redis (key-value pair).  
    Example: `SET key "value"`
- **GET**: Retrieve data from Redis.  
    Example: `GET key`
- **EXPIRE**: Set expiration time for keys.  
    Example: `EXPIRE key 60` (60 seconds)
- **DEL**: Delete a key.  
    Example: `DEL key`
- **TTL**: Get remaining time to live of a key.  
    Example: `TTL key`
- **HSET/HGET**: Store/retrieve values from a hash.
- **LPUSH/RPUSH**: Add elements to a list (left or right).
- **SADD**: Add elements to a set.
- **ZADD**: Add elements to a sorted set.

---
## **⬇️ Setup Redis For Python Project in Window**

#### **✅ Install Redis on Windows**

1. **Download Redis for Windows**
    
    - Go to: [https://github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases)
    - Download `Redis-x64-3.2.100.msi` and install it.
2. **Start Redis Server**
    
    - Open **Command Prompt (cmd)** and run:
        ```bash
        redis-server
        ```
        
3. **Verify Redis is Running**
    
    - Open another **cmd** window and run:
        ```bash
        redis-cli ping
        ```
        
    - If it returns `PONG`, Redis is working! 🎉

#### **✅ Use Redis in Python**

4. **Install Redis Library**
    ```bash
    pip install redis flask-caching
    ```
    
5. **Modify Your `app.py` as required**  

---

### **2. Store Data in a Database (Best for Scalability)**

Instead of caching, **store contests in a database** (MongoDB, PostgreSQL, MySQL).

- **Fetch new data every hour** using a **cron job** or **Celery task**.
- **Users fetch from DB instead of APIs/scraping.**

Would you like a **Celery + DB** solution? 🚀

## **🌐 Connecting to Redis (Python Example)**

To connect and interact with Redis using Python, you need to install the `redis` library:

```bash
pip install redis
```

Example usage:

```python
import redis

# Connect to Redis (on localhost, default port 6379)
redis_client = redis.StrictRedis(host="localhost", port=6379, decode_responses=True)

# Set a key-value pair
redis_client.set("name", "Redis")

# Get the value of a key
value = redis_client.get("name")
print(value)  # Output: "Redis"
```

---

## **⚡️ Redis Caching Strategy**

### **Using Redis to Cache API Data**

Redis is frequently used to store and cache API data to improve performance.

### Example:

```python
import redis
import json
import time

# Connect to Redis
redis_client = redis.StrictRedis(host="localhost", port=6379, decode_responses=True)

def fetchContests():
    cached_data = redis_client.get("contests_data")
    if cached_data:
        return json.loads(cached_data)  # Return cached contests
    
    # Simulate fetching contest data (API call)
    time.sleep(3)
    contests = {"contests": ["Hackerrank", "Codeforces", "AtCoder"]}
    
    # Store the result in Redis for 30 minutes
    redis_client.setex("contests_data", 1800, json.dumps(contests))
    
    return contests
```

- **Caching Mechanism**:
    - Check Redis first: If the data exists, return it.
    - If the data doesn't exist, fetch from the API and cache the response in Redis for a given expiration time.

---

## **🖥️ Redis Setup on Windows**

To install and run Redis locally on **Windows**:

6. Download Redis from [Microsoft Redis GitHub](https://github.com/microsoftarchive/redis/releases).
7. Run `redis-server` in the **Command Prompt**.

To add Redis to your system’s **PATH**:

8. Find the folder where Redis is installed (e.g., `C:\Program Files\Redis`).
9. Add this folder to your **system PATH** via Control Panel → System → Advanced system settings → Environment Variables → Path.

---

## **⚡️ Redis Setup for Cloud (Optional)**

For **cloud-based Redis** (e.g., **Redis Cloud** or **AWS ElastiCache**), you can update your Flask config to point to your cloud Redis instance:

```python
app.config["CACHE_REDIS_URL"] = "redis://your-cloud-redis-url"
```

Redis can then be used in a distributed environment for multiple users.

---

## **🔥 Benefits of Redis**

- **Speed**: In-memory operations are fast (milliseconds).
- **Scalable**: Redis supports sharding and can scale horizontally.
- **Simple Setup**: Easy to install and configure.

---

## **❓ Common Redis Issues**

- **Connection issues**: Ensure Redis is running and accessible from your application.
- **Cache expiration**: Use appropriate expiration times to keep cache data fresh.
- **Memory usage**: Monitor memory usage as Redis stores data in RAM. Redis can handle large data volumes, but be mindful of your server’s RAM limits.

---

### **💡 Conclusion**

Redis is a powerful tool for speeding up applications, improving performance, and scaling services. It’s primarily used for caching but can be used for a wide variety of other use cases like real-time data processing, session management, and more.

Let me know if you'd like to explore any specific Redis concepts in more detail! 🚀