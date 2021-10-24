# Iesu-artisan by Team Sian | README

## Project description

- A dynamic website that features semi-like e-commerce functionality. Utilizing Gerrit Code Review for our version control system.

## Project Members

- **Project Manager** : _Adrian Garett Sian._
- **Front-end developer** : _Aaron Karl Mayor._
- **Back-end developer** : _Eduardo Gabriel Nacion._
- **Database Administrator** : _Reymart Visaya._
- **Requirements Analyst** : _Derick De Jesus._

## Changelog | Documentation

- On **15 September 2021**, The group have finalized the version 2 prototype that was presented to the client. We now have a verbal consent regarding the approval, however the group must still create an agreement form the will be given to the client.

- On **10 September 2021**, The group have collected requirements regarding the project.

---

## Initialize the project

If you haven't yet successfully downloaded the source make sure you are familiar with those steps.

Setup an account on [Gerrit](https://review.gerrithub.io) and configure your Gerrit username in the Gerrit portal under **Settings -> HTTP Password**.

**❗ IMPORTANT**: *Gerrit ensures users have completed a valid Contributor Agreement prior to accepting any transferred objects, and if it is not completed, it aborts the network connection before data is sent.*

Now make sure your local git username matches with your Gerrit username:

```
git config --global user.email 'you@yourDomain.com'
git config --global review.review.gerrithub.io.username "gerritUsername"
```

**❕  NOTE**: *Your Gerrit username is case-sensitive.*

If you already have SSH keys set up (e.g. for GitHub), skip the following two steps.

Generate the SSH keys,<sup>[[1]](#TroubleshootingTag)</sup>:

```
ssh-keygen -t rsa -C "your@email.com"
```

Add the keys to the ssh-agent:

```
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa
ssh-add
```

After that, copy/paste the content of `~/.ssh/id_rsa.pub` to your Gerrit SSH Settings under **Settings -> SSH Keys**.

The steps above have to be performed only once.

## Submitting to Gerrit

### Uploading your changes

First, you need to start a topic branch. This branch holds the changes you make to the files on your computer that you will ultimately send to the LineageOS' Gerrit instance for review. Create your topic branch:

```
git clone "https://review.gerrithub.io/garett09/Iesu-artisan" && (cd "Iesu-artisan" && mkdir -p .git/hooks && curl -Lo `git rev-parse --git-dir`/hooks/commit-msg https://review.gerrithub.io/tools/hooks/commit-msg; chmod +x `git rev-parse --git-dir`/hooks/commit-msg)
```

**❕  NOTE**: *This starts a new branch called `<branch name>` in the `<project path>` project. Replace `<project path>` with the path of your target repository instead.*

Change to the project (directory) that contains the file(s) you want to edit:

```
cd Iesu-artisan
```

Do all the changes you need.

**⚠️ WARNING**: *Make sure you do not commit any changes before you run `git checkout main`, otherwise your changes will happen on a different branch and will not be tracked correctly.*

After you make your changes, you can commit them just as you normally would:

```
git add <file you edited>
git commit
```

Alternatively you can run `git add .` to stage all changes.

**✔️ TIP**: *The first line of your commit message will become the change's title. Add a blank line after the title and write the summary of changes there, if you would like. Make sure that each line does not exceed 80 chars and the title should not exceed 50 chars.*

Now you can upload your changes to Gerrit:

```
git push origin HEAD:refs/for/main
```

That's it! Your change will be reviewed and may be accepted or rejected. See [#Example_Cases] below for an example.

### Submitting patch sets

It can happen that your submitted patch has issues or errors, which are noted in the code review, so you will want to resolve them. Sometimes it's just tabs instead of spaces or typos in strings and variable names. To avoid some formal mistakes, make sure you're familiar with the Android code style. For Eclipse users, just follow the instructions in `development/ide/eclipse/README.importing-to-eclipse.txt`.

Before you edit those files, make sure you are on the correct branch:

Note: View the branches here.

```
git branch -v
```

If you are not or in no branch at all, switch to the correct branch:

```
git checkout main
```

Now you can edit the files you want. After that, do the usual `git status` and notice that `git diff` will only show you the changes you just made.
Make sure you add the files that you've modified by using `git add`. Once you're satisfied, prepare the upload, by amending your commit:

```
git commit --amend
```

This will open an editor with your initial commit message. You can change the commit message if you want to, but make sure the line starting with Change-Id remains unchanged as it contains the initial change ID. With this id, Gerrit will detect your upload as a patch set and not as a new patch.

You can do `git log` and `git status` again. Notice how git handles your initial commit and the amended commit as one single patch. As for `git show`, it shows you all the changes made on that commit.

Finally, you can submit your patch set to your initial patch by typing:

```
git push origin HEAD:refs/for/main
```

### Example cases

#### Edit `script.js`

Let's say you want to make a change in `script.js` that resides in the `js` project, and upload that to Gerrit for review. Start a local branch of that repo (directory) and call it `mychanges`:

```
cd js
git branch mychanges
```

Make the edits to that file. You can check those changes:

```
git add script.js -n
```

If the results are acceptable, stage the modified file:

```
git add script.js
```

Then commit it:

```
git commit -m 'Added feature xyz'
```

Issue the upload:

```
git push origin HEAD:refs/for/main
```

You should be asked a few questions and your commit should then be uploaded to Gerrit for review.

### Troubleshooting

If you get a "Permission denied (publickey)" error and you're sure that everything is right, try using a DSA key instead of RSA.

```
ssh-keygen -t dsa -C "your@email.com"
```

## Getting your submission reviewed/merged

**All submitted patches go through a code review process prior to being merged.** In addition to peer reviews, certain project members have the capability to merge your changes into Iesu Artisan.
To make sure they get informed:

1. Add reviewers:

- For project repos, add the **Project manager** on **Gerrit**. `adriansian@gmail.com or garett09`
  - It is important to submit quality code prior to reviewing. If not approved, kindly resubmit a patch.

2. Set the proper labels to indicate your patch is ready.

## Common commands

See [Git Immersion](http://gitimmersion.com/) for more information.

### `git`

- `git add <file name>` to stage a file that has been changed or added.

- `git commit -m "comment"` to commit a change.

- `git reset HEAD <file name>` to unstage a file.

- `git revert HEAD` to undo the last commit.

- `git status` to see the status of a project.

### `git subcommands`

- `--date="DATE"` to specify the date of change if necessary. DATE has to be in RFC 2822, ISO 8601 or git internal time format.

  Examples:

  - RFC 2822: Thu, 16 Sept 2021 17:39:48 +0800

  - ISO 8601: 2021-09-16T17:39:48+0800

  - git internal format: 1516210788 +0800

- `--author="NAME <EMAIL>"` to name the author if you did not write the patch yourself.

- `--amend` to modify the last commit.

## Resources

[Git Immersion](http://gitimmersion.com/)

[Git and repo overview](https://source.android.com/source/developing)

[Gerrit Documentation](https://review.lineageos.org/Documentation/index.html)
