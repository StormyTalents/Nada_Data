git branch develop
git branch fix/sth
git branch feat/sth
git branch add/sth

git push -u origin fix/sth : it means that push permanetly into fix/sth.

##start branching
git branch
git checkout -b fix/fonts
git status
##end branching

##start by git flow
git branch
git checkout -b feature_branch //
##end by git flow

##start finishing branch
git checkout develop
git merge feature_branch
##end finishg branch

##exmaples
git checkout main
git checkout -b develop
git checkout -b feature_branch
#work happens on feature branch
git checkout develop
git merge feature_branch
git checkout main
git merge develop
git branch -d feature_branch

git clone https://eltonninja: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@github.com/kikocoelho/petroplus-web.git

https://github.com/
https://github.com/eltonninja//'


##example2
git checkout main
git checkout -b hotfix_branch
#work is one commits are added to the hotfix_branch
git checkout develop
git merge hotfix_branch
git checkout main
git merge hotfix_branch

##error
git config --global core.askpass  // clone error
git status

##commit
git commit -m 'Initial comment'

##Pull request
git checkout -b some-feature
#edit some code
git commit -a -m "add.."



(fix/scanner-input-font)


git branch -m main master
git fetch origin
git branch -u origin/master master
git remote set-head origin -a

git remote set-url origin https://eltonninja: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@github.com/st2017re/edit2.git
git clone https://eltonninja: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@github.com/st2017re/edit2.git
git remote set-url origin https://eltonninja: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@github.com/eltonninja/DebtTracking.git
git remote add origin https://github.com/eltonninja/DebtTracking.git


git remote add origin https://eltonninja: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@github.com/eltonninja/EmployeRecipes.git

git remote set-url origin https://eltonninja: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@github.com/eltonninja/portfolio.git
https://github.com/eltonninja//'
git remote add origin https://github.com/eltonninja/engagemd.git 

git remote add origin https://eltonninja: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@github.com/eltonninja/PTPP.git
git remote set-url origin https://eltonninja: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@github.com/eltonninja/PTP.git

