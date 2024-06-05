package net.tamasnovak.domains.comment.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.application.service.ApplicationService;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.comment.dtoResponse.CommentDto;
import net.tamasnovak.domains.comment.models.dtoRequests.NewCommentDto;
import net.tamasnovak.domains.comment.models.entity.Comment;
import net.tamasnovak.domains.comment.persistence.CommentRepository;
import net.tamasnovak.domains.comment.persistence.CommentView;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CommentServiceImpl implements CommentService {
  private final AuthenticationFacade authenticationFacade;
  private final CommentRepository commentRepository;
  private final ApplicationService applicationService;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public CommentServiceImpl(AuthenticationFacade authenticationFacade, CommentRepository commentRepository, ApplicationService applicationService, GlobalServiceConstants globalServiceConstants) {
    this.authenticationFacade = authenticationFacade;
    this.commentRepository = commentRepository;
    this.applicationService = applicationService;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public CommentDto getCommentDtoByUuid(String uuid) {
    CommentView commentView = commentRepository.findCommentViewByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

    return new CommentDto(commentView);
  }

  @Override
  @Transactional
  public CommentDto postCommentByApplicationUuid(String applicationUuid, NewCommentDto requestBody) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();
    Application relatedApplication = applicationService.getByUuid(applicationUuid);

    Comment newComment = Comment.createComment(
      relatedApplication,
      authAccount,
      requestBody.content()
    );

    Comment savedComment = commentRepository.save(newComment);

    return getCommentDtoByUuid(savedComment.getUuid().toString());
  }
}
