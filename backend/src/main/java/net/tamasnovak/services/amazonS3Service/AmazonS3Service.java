package net.tamasnovak.services.amazonS3Service;

import java.io.File;

public interface AmazonS3Service {
  void uploadFileToS3Bucket(String filename, File file);
}
