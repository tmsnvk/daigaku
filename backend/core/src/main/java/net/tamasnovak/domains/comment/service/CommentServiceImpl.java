package net.tamasnovak.domains.comment.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.account.account.entity.Account;
import net.tamasnovak.domains.application.application.service.ApplicationService;
import net.tamasnovak.domains.application.shared.entity.Application;
import net.tamasnovak.domains.comment.dto.NewComment;
import net.tamasnovak.domains.comment.dto.CommentDetails;
import net.tamasnovak.domains.comment.dto.CommentsPagination;
import net.tamasnovak.domains.comment.entity.Comment;
import net.tamasnovak.domains.comment.persistence.CommentRepository;
import net.tamasnovak.domains.comment.persistence.CommentView;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Qualifier(value = "CommentService")
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
  public CommentsPagination getAllCommentResponsesByApplicationUuid(final String applicationUuid,
                                                                    final int page) {
    final Pageable pageable = PageRequest.of(page, 5);
    final Page<CommentView> commentViews = commentRepository.findAllCommentViewsByApplicationUuid(UUID.fromString(applicationUuid), pageable);

    final List<CommentDetails> comments = commentViews.stream()
      .map(CommentDetails::new)
      .collect(Collectors.toList());

    return new CommentsPagination(commentViews.getTotalPages(), commentViews.getNumber(), commentViews.getTotalElements(), comments);
  }

  @Override
  @Transactional(readOnly = true)
  public CommentDetails getCommentDtoByUuid(final String uuid) {
    final CommentView commentView = commentRepository.findCommentViewByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

    return new CommentDetails(commentView);
  }

  @Override
  @Transactional
  public void postCommentByApplicationUuid(final String applicationUuid, final NewComment requestBody) {
    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final Application relatedApplication = applicationService.getByUuid(applicationUuid);

    final Comment newComment = Comment.createComment(
      relatedApplication,
      authAccount,
      requestBody.commentContent()
    );

    commentRepository.save(newComment);
  }
}
