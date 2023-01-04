import Tag from '../../types/Tag'

type TagEntry = {
    name: string,
    weight: number,
    post_id: number,
    user_id: number,
}

interface Counter {
    [name: string]: [number, number]
}

function ProcessTags(tagEntries: TagEntry[]) {
    const tagcounts = tagEntries.reduce((counters: Counter, {name, weight, user_id}: TagEntry) => {
        if(user_id == 0) {
            if (counters[name]) {
                counters[name][0] += weight
            }
            else {
                counters[name] = [weight, 0]
            }
        }

        if(user_id == 1) {
            if (counters[name]) {
                counters[name][1] += weight
            }
            else {
                counters[name] = [0, weight]
            }
        }

        return counters
    }, {})

    const tags: Tag[] = []
    for (const name in tagcounts) {
        tags.push({name: name, weight: tagcounts[name][0], userWeight: tagcounts[name][1]})
    }
    
    return tags;
}

export default ProcessTags