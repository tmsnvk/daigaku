package net.tamasnovak.configuration.cache;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisCacheConfig {
  private final ObjectMapper objectMapper;

  @Autowired
  public RedisCacheConfig(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Bean
  public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
    RedisTemplate<Object, Object> template = new RedisTemplate<>();

    template.setConnectionFactory(redisConnectionFactory);
    template.setDefaultSerializer(new GenericJackson2JsonRedisSerializer(objectMapper));

    return template;
  }

  @Bean
  public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
    return (builder) -> builder
//      .withCacheConfiguration("AllApplicationRecordsByAccountUuid", RedisCacheConfiguration.defaultCacheConfig()
//        .entryTtl(Duration.ofMinutes(15))
//        .disableCachingNullValues()
//        .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer(objectMapper))))
//      .withCacheConfiguration("SingleApplicationRecordByUuid", RedisCacheConfiguration.defaultCacheConfig()
//        .entryTtl(Duration.ofMinutes(15))
//        .disableCachingNullValues()
//        .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer(objectMapper))))
      .withCacheConfiguration("StudentByAccountUuid", RedisCacheConfiguration.defaultCacheConfig()
        .entryTtl(Duration.ofMinutes(15))
        .disableCachingNullValues()
        .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())))
      .withCacheConfiguration("DashboardAggregateDataDtoByAccountUuid", RedisCacheConfiguration.defaultCacheConfig()
        .entryTtl(Duration.ofMinutes(15))
        .disableCachingNullValues()
        .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())));
  }
}
