votes = 'AABBBBBBCCCCCDDDDDDDDDDD'
unique_votes = set(votes)
vote_and_count = []
for item in unique_votes:
    specific_count = votes.count(item)
    vote_and_count.append([item, specific_count])


max = 0
total_count = 0
target_vote = None
target_vote_count = 0
for i in vote_and_count:
    total_count = total_count + i[1]
    if i[1] > max:
        target_vote = i[0]
        target_vote_count = i[1]
        max = i[1]

print('Target Vote:', target_vote,  ' Value:', target_vote_count / total_count)
