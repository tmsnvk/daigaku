/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.comment.dto.CommentPaginationResponse;
import net.tamasnovak.artifact.comment.dto.CommentViewResponse;
import net.tamasnovak.artifact.comment.dto.NewCommentRequest;
import net.tamasnovak.artifact.comment.entity.Comment;
import net.tamasnovak.artifact.comment.persistence.CommentRepository;
import net.tamasnovak.artifact.comment.persistence.CommentView;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Comment} entity-related operations, implementing {@link CommentService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "CommentService")
public class CommentServiceImpl implements CommentService {
  private static final int NUMBER_OF_COMMENTS_PER_PAGE = 5;

  private final AuthenticationFacade authenticationFacade;
  private final CommentRepository commentRepository;
  private final ApplicationService applicationService;

  @Autowired
  public CommentServiceImpl(
    AuthenticationFacade authenticationFacade, CommentRepository commentRepository,
    ApplicationService applicationService) {
    this.authenticationFacade = authenticationFacade;
    this.commentRepository = commentRepository;
    this.applicationService = applicationService;
  }

  @Override
  @Transactional(readOnly = true)
  public CommentPaginationResponse findAllCommentsByApplicationUuid(final UUID applicationUuid, final int page) {
    // Finds all Comment instances for the selected page number.
    final Pageable pageable = PageRequest.of(page, NUMBER_OF_COMMENTS_PER_PAGE);
    final Page<CommentView> commentViews = commentRepository.findAllCommentViewsByApplicationUuid(applicationUuid, pageable);

    // Transforms the db projection into a list of view objects.
    final List<CommentViewResponse> comments = commentViews.stream()
                                                           .map(CommentViewResponse::new)
                                                           .collect(Collectors.toList());

    // Returns the response object.
    return new CommentPaginationResponse(commentViews.getTotalPages(), commentViews.getNumber(), commentViews.getTotalElements(), comments);
  }

  @Override
  @Transactional
  public void createCommentByApplicationUuid(final UUID applicationUuid, final NewCommentRequest requestBody) {
    // Finds the authenticated user's Account and the associated Application.
    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final Application relatedApplication = applicationService.findApplicationByUuid(applicationUuid);

    // Creates and saves the new Comment instance.
    final Comment newComment = Comment.createComment(relatedApplication, authAccount, requestBody.comment());
    commentRepository.save(newComment);
  }
}
