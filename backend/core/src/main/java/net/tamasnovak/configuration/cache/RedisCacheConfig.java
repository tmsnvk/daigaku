package net.tamasnovak.configuration.cache;

import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisCacheConfig {
  @Bean
  public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
    return (builder) -> builder
      .withCacheConfiguration("AllApplicationRecordsByAccountUuid", defaultCacheConfiguration(Duration.ofMinutes(15)))
      .withCacheConfiguration("SingleApplicationRecordByUuid", defaultCacheConfiguration(Duration.ofMinutes(15)))
      .withCacheConfiguration("StudentByAccountUuid", defaultCacheConfiguration(Duration.ofMinutes(15)))
      .withCacheConfiguration("DashboardAggregateDataDtoByAccountUuid", defaultCacheConfiguration(Duration.ofMinutes(15)));
  }

  private RedisCacheConfiguration defaultCacheConfiguration(Duration duration) {
    return RedisCacheConfiguration.defaultCacheConfig()
      .entryTtl(duration)
      .disableCachingNullValues()
      .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
  }
}
