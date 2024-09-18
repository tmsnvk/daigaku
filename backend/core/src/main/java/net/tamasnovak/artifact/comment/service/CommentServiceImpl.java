package net.tamasnovak.artifact.comment.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.comment.dto.NewComment;
import net.tamasnovak.artifact.comment.dto.CommentDetails;
import net.tamasnovak.artifact.comment.dto.CommentPagination;
import net.tamasnovak.artifact.comment.entity.Comment;
import net.tamasnovak.artifact.comment.persistence.CommentRepository;
import net.tamasnovak.artifact.comment.persistence.CommentView;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
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
  private final GlobalServiceConstants globalConstants;

  @Autowired
  public CommentServiceImpl(AuthenticationFacade authenticationFacade, CommentRepository commentRepository, ApplicationService applicationService, GlobalServiceConstants globalConstants) {
    this.authenticationFacade = authenticationFacade;
    this.commentRepository = commentRepository;
    this.applicationService = applicationService;
    this.globalConstants = globalConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public CommentPagination findAllByApplicationUuid(final UUID uuid,
                                                    final int page) {
    final Pageable pageable = PageRequest.of(page, 5);
    final Page<CommentView> commentViews = commentRepository.findAllCommentViewsByApplicationUuid(uuid, pageable);

    final List<CommentDetails> comments = commentViews.stream()
      .map(CommentDetails::new)
      .collect(Collectors.toList());

    return new CommentPagination(commentViews.getTotalPages(), commentViews.getNumber(), commentViews.getTotalElements(), comments);
  }

//  @Override
//  @Transactional(readOnly = true)
//  public CommentDetails getCommentDtoByUuid(final UUID uuid) {
//    final CommentView commentView = commentRepository.findCommentViewByUuid(uuid)
//      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
//
//    return new CommentDetails(commentView);
//  }

  @Override
  @Transactional
  public void createByApplicationUuid(final UUID uuid, final NewComment requestBody) {
    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final Application relatedApplication = applicationService.findByUuid(uuid);

    final Comment newComment = Comment.createComment(
      relatedApplication,
      authAccount,
      requestBody.comment()
    );

    commentRepository.save(newComment);
  }
}
