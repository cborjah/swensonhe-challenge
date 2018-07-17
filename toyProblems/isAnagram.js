/*
Write a function/method utilizing Java, JavaScript, Objective-C or Swift to
determine whether two strings are anagrams or not (examples of anagrams: debit
card/bad credit, punishments/nine thumps, etc).
*/

const isAnagram = (str1, str2) => {
  console.log("str1: ", str1);
  console.log("str2: ", str2);

  const tempStr1 = str1.trim().slice().split("");
  const tempStr2 = str2.trim().slice().split("");

  for (let i = 0; i < str2.length; i++) {
    if (tempStr1.length) {
      if (tempStr1.includes(str2[i])) {
        tempStr1.splice(tempStr1.indexOf(str2[i]), 1);
      } else if (str2[i] !== " " ) {
        return console.log("NOT an anagram.\n");
      }
    } else if (str2[i]) {
      return console.log("NOT an anagram.\n");
    }
  }

  for (let i = 0; i < str1.length; i++) {
    if (tempStr2.length) {
      if (tempStr2.includes(str1[i])) {
        tempStr2.splice(tempStr2.indexOf(str1[i]), 1);
      } else if (str1[i] !== " ") {
        return console.log("NOT an anagram.\n");
      }
    } else if (str1[i]) {
      return console.log("NOT an anagram.\n");
    }
  }

  return console.log("Is an anagram.\n");
}

// anagrams can be different lengths

isAnagram("debit card", "bad credit");
isAnagram("punishment", "nine thumps");
isAnagram("punishments", "nine thumps");
isAnagram("are", "area");
