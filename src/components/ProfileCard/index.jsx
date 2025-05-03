import {
    Card,
    CardBody,
    Avatar,
    Typography,
  } from "@material-tailwind/react";
  
  const ProfileCard = ({profile})=> {
    const {firstName, lastName, email} = profile
    const userImage = 'https://www.material-tailwind.com/img/avatar3.jpg'
    return (
      <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
        <CardBody className="text-center">
          <Avatar
            src={userImage}
            alt={userImage}
            variant="circular"
            size="xxl"
            className="mx-auto mb-6 object-top"
          />
          <Typography variant="h5" color="blue-gray" className="!font-medium text-lg">
            {firstName} {lastName}
          </Typography>
          <Typography
            color="blue-gray"
            className="mb-2 !text-base !font-semibold text-gray-600"
          >
            {email}
          </Typography>
        </CardBody>
      </Card>
    );
  }

  export default ProfileCard;