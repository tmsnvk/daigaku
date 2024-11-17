/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.configuration.cache;

import java.time.Duration;

import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;

/**
 * Redis cache configuration class.
 *
 * @since 0.0.1
 */
@Configuration
@EnableCaching
public class RedisConfiguration {
  /**
   * Instantiates a {@link RedisCacheManagerBuilderCustomizer} Spring Bean on application start.
   *
   * @return {@link RedisCacheManagerBuilderCustomizer}.
   */
  @Bean
  public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
    return (builder) -> builder
      .withCacheConfiguration("AllApplicationRecordsByAccountUuid", defaultCacheConfiguration(Duration.ofMinutes(15)))
      .withCacheConfiguration("SingleApplicationRecordByUuid", defaultCacheConfiguration(Duration.ofMinutes(15)))
      .withCacheConfiguration("StudentByAccountUuid", defaultCacheConfiguration(Duration.ofMinutes(15)))
      .withCacheConfiguration("DashboardAggregateDataDtoByAccountUuid", defaultCacheConfiguration(Duration.ofMinutes(15)));
  }

  /**
   * Configures the default Redis cache settings.
   *
   * @param duration The duration of how long the cache is stored in memory.
   * @return {@link RedisCacheConfiguration}.
   */
  private RedisCacheConfiguration defaultCacheConfiguration(final Duration duration) {
    return RedisCacheConfiguration.defaultCacheConfig()
                                  .entryTtl(duration)
                                  .disableCachingNullValues()
                                  .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
  }
}
