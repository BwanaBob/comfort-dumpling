
   function _getCommentMessage(comment, jobName) {
      const commentFooterPost = `📌 ${comment.link_title.slice(
         0,
         config.commentTitleSize
      )}`
      // Create initial embed
      const commentEmbed = {}
         .setDescription(`${comment.body.slice(0, config.commentSize)}`)
         .setFooter({ text: commentFooterPost })
      // Get server based avatar image
      let thisAttachment = this._getSubmissionAttachment(comment)
      commentEmbed.setAuthor({
         name: comment.author,
         url: `https://www.reddit.com${comment.permalink}`,
         iconURL: `attachment://${thisAttachment.name}`,
      })

      // Get visibility status and format accordingly
      if (!comment.banned_at_utc && jobName !== 'getNewModQueue') {
         commentEmbed.setColor(config.jobOutput.newComment.embedColor)
         // commentEmbed.setFooter({ text: `` })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      if (comment.banned_at_utc && comment.spam) {
         // Never seen this
         commentEmbed.setColor(config.jobOutput.spamComment.embedColor)
         commentEmbed.setTitle('Spam Comment')
         commentEmbed
            .setURL(
               `https://www.reddit.com/mod/${comment.subreddit}/queue?dx_mod_queue=enabled&queueType=removed`
            )
            .setFooter({
               text: `${commentFooterPost}\nUnusual Spam Comment - Leave for analysis`,
            })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      if (
         comment.banned_at_utc &&
         !comment.ban_note &&
         comment.banned_by &&
         comment.banned_by === true &&
         comment.removed_by_category == 'reddit'
      ) {
         commentEmbed.setColor(config.jobOutput.spamComment.embedColor)
         commentEmbed.setTitle('Removed Comment')
         commentEmbed.setURL(
            `https://www.reddit.com/mod/${comment.subreddit}/queue?dx_mod_queue=enabled&queueType=removed`
         )
         commentEmbed.setFooter({
            text: `${commentFooterPost}\nReddit Spam Comment - Uncommon`,
         })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      if (
         comment.banned_at_utc &&
         comment.ban_note &&
         comment.ban_note == 'reinforce spam' &&
         comment.banned_by &&
         comment.banned_by === true &&
         comment.removed_by_category &&
         comment.removed_by_category == 'reddit'
      ) {
         // "Removed by Reddit's spam filter"
         commentEmbed.setColor(config.jobOutput.modQueueComment.embedColor)
         commentEmbed.setTitle('Queued Comment')
         commentEmbed.setURL(
            `https://www.reddit.com/mod/${comment.subreddit}/queue`
         )
         commentEmbed.setFooter({
            text: `${commentFooterPost}\nQueued by Subreddit Spam Settings`,
         })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      // if (
      //    post.banned_at_utc &&
      //    post.ban_note &&
      //    post.ban_note == 'comfirm spam' &&
      //    post.banned_by &&
      //    post.banned_by == 'AutoModerator'
      // ) {
      //    return { status: 'Queued', subStatus: 'Automoderator ' } // this is on a comment karma one. Likely both automod and reddit reputation filtered
      // }

      if (
         comment.banned_at_utc &&
         comment.ban_note &&
         comment.ban_note == 'remove not spam' &&
         comment.banned_by &&
         comment.banned_by == 'AutoModerator' &&
         comment.author_flair_css_class == 'shadow'
      ) {
         commentEmbed.setColor(config.jobOutput.spamComment.embedColor)
         commentEmbed.setTitle('Removed Comment')
         commentEmbed.setURL(
            `https://www.reddit.com/mod/${comment.subreddit}/queue?dx_mod_queue=enabled&queueType=removed`
         )
         commentEmbed.setFooter({
            text: `${commentFooterPost}\nShadowBanned by AutoModerator`,
         })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      if (
         comment.banned_at_utc &&
         comment.ban_note &&
         comment.ban_note == 'remove not spam' &&
         comment.banned_by &&
         comment.banned_by == 'AutoModerator' &&
         comment.author_flair_css_class == 'watch'
      ) {
         commentEmbed.setColor(config.jobOutput.modQueueComment.embedColor)
         commentEmbed.setTitle('Queued Comment')
         commentEmbed.setURL(
            `https://www.reddit.com/mod/${comment.subreddit}/queue`
         )
         commentEmbed.setFooter({
            text: `${commentFooterPost}\nWatch List by AutoModerator`,
         })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      if (
         comment.banned_at_utc &&
         comment.ban_note &&
         comment.ban_note == 'remove not spam' &&
         comment.banned_by &&
         comment.banned_by == 'AutoModerator'
      ) {
         commentEmbed.setColor(config.jobOutput.modQueueComment.embedColor)
         commentEmbed.setTitle('Queued Comment')
         commentEmbed.setURL(
            `https://www.reddit.com/mod/${comment.subreddit}/queue`
         )
         commentEmbed.setFooter({
            text: `${commentFooterPost}\nFiltered by AutoModerator`,
         })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      if (comment.num_reports && comment.num_reports > 0) {
         commentEmbed.setColor(config.jobOutput.modQueueComment.embedColor)
         commentEmbed.setTitle('Queued Comment')
         commentEmbed.setURL(
            `https://www.reddit.com/mod/${comment.subreddit}/queue`
         )
         commentEmbed.setFooter({ text: `${commentFooterPost}\nReported` })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      if (
         comment.banned_at_utc &&
         comment.ban_note &&
         comment.ban_note == 'confirm spam' &&
         comment.banned_by &&
         comment.banned_by == true &&
         comment.collapsed_reason_code &&
         comment.collapsed_reason_code == 'CROWD_CONTROL'
      ) {
         commentEmbed.setColor(config.jobOutput.modQueueComment.embedColor)
         commentEmbed.setTitle('Queued Comment')
         commentEmbed.setURL(
            `https://www.reddit.com/mod/${comment.subreddit}/queue`
         )
         commentEmbed.setFooter({
            text: `${commentFooterPost}\nFiltered by Reddit - Crowd Control (karma)`,
         })
         return { embeds: [commentEmbed], files: [thisAttachment] }
      }

      // Unknown visibility
      if (comment.banned_at_utc) {
         const bannedAtDate = new Date(comment.banned_at_utc * 1000)
         const bannedAtString = bannedAtDate.toLocaleString()
         commentEmbed.addFields({
            name: 'Ban Time',
            value: bannedAtString,
            inline: true,
         })
      }

      if (comment.ban_note) {
         commentEmbed.addFields({
            name: 'Ban Note',
            value: comment.ban_note,
            inline: true,
         })
      }

      if (comment.banned_by) {
         if (comment.banned_by === true) {
            commentEmbed.addFields({
               name: 'Banned By',
               value: 'true',
               inline: true,
            })
         } else {
            commentEmbed.addFields({
               name: 'Banned By',
               value: comment.banned_by,
               inline: true,
            })
         }
      }

      if (comment.removed_by_category) {
         commentEmbed.addFields({
            name: 'Removed By Category',
            value: comment.removed_by_category,
            inline: true,
         })
      }

      if (comment.collapsed_reason_code) {
         commentEmbed.addFields({
            name: 'Reason Code',
            value: comment.collapsed_reason_code,
            inline: true,
         })
      }

      commentEmbed.setColor(config.jobOutput.spamComment.embedColor)
      commentEmbed.setTitle('Unknown Comment')
      commentEmbed.setURL(
         `https://www.reddit.com/mod/${comment.subreddit}/queue`
      )
      commentEmbed.setFooter({
         text: `${commentFooterPost}\nUnusual Comment - Leave for analysis`,
      })

      return { embeds: [commentEmbed], files: [thisAttachment] }
   }

export _getCommentMessage